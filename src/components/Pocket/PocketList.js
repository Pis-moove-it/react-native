import React, { Component } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditIdPocketModal } from '../../actions/EditIdPocketModalActions';
import { openEditWeightPocketModal } from '../../actions/EditWeightPocketModalActions';
import { getPockets } from '../../actions/PocketActions';
import EditIdPocketModal from '../common/EditIdPocketModal';
import EditWeightPocketModal from '../common/EditWeightPocketModal';
import pockets from '../../selectors/PocketSelector';
import TabletPocket from './TabletPocket';
import PhonePocket from './PhonePocket';

class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.getPockets(this.props.token);
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token).then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    return (
      <View>
        <EditIdPocketModal />
        <EditWeightPocketModal />
        <FlatList
          data={this.props.pockets}
          renderItem={({ item }) => {
            if (isPhone) {
              return (
                <PhonePocket

                  openEditIdPocketModal={this.props.openEditIdPocketModal}
                  openEditWeightPocketModal={() => this.props.openEditWeightPocketModal(item.state !== 'Unweighed')}
                  id={item.serial_number}
                  time={item.check_in}
                  weight={item.weight}
                  pocketState={item.state}
                />
              );
            }
            return (
              <TabletPocket
                id={item.serial_number}
                time={item.check_in}
                weight={item.weight}
                pocketState={item.state}
                openEditIdPocketModal={this.props.openEditIdPocketModal}
                openEditWeightPocketModal={() => this.props.openEditWeightPocketModal(item.state !== 'Unweighed')}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        />
      </View>
    );
  }
}

PocketList.propTypes = {
  openEditIdPocketModal: PropTypes.func.isRequired,
  openEditWeightPocketModal: PropTypes.func.isRequired,
  getPockets: PropTypes.func.isRequired,
  pockets: PropTypes.array,
  token: PropTypes.string,
};

PocketList.defaultProps = {
  pockets: [],
  token: false,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditIdPocketModal: () => dispatch(openEditIdPocketModal()),
  openEditWeightPocketModal: hasWeight => dispatch(openEditWeightPocketModal(hasWeight)),
  getPockets: token => dispatch(getPockets(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
