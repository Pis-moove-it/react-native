import React, { Component } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditIdPocketModal } from '../../actions/EditIdPocketModalActions';
import { openEditWeightPocketModal } from '../../actions/EditWeightPocketModalActions';
import { getPockets } from '../../actions/PocketActions';
import EditIdPocketModal from '../common/EditIdPocketModal';
import EditWeightPocketModal from '../common/EditWeightPocketModal';
import { pockets, getPocketsQuantity } from '../../selectors/PocketSelector';
import Colors from '../../helpers/Colors';
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <EditIdPocketModal />
        <EditWeightPocketModal />
        {!this.state.refreshing && this.props.pockets.length !== this.props.pocketsQuantity ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={this.props.pockets}
            renderItem={({ item }) => {
              if (isPhone) {
                return (
                  <PhonePocket
                    id={item.serial_number}
                    time={item.check_in}
                    weight={item.weight}
                    pocketState={item.state}
                    openEditIdPocketModal={() =>
                      this.props.openEditIdPocketModal(item.id, item.serial_number)
                    }
                    openEditWeightPocketModal={() =>
                      this.props.openEditWeightPocketModal(
                        item.id,
                        item.weight,
                        item.state !== 'Unweighed',
                      )
                    }
                  />
                );
              }
              return (
                <TabletPocket
                  id={item.serial_number}
                  time={item.check_in}
                  weight={item.weight}
                  pocketState={item.state}
                  openEditIdPocketModal={() =>
                    this.props.openEditIdPocketModal(item.id, item.serial_number)
                  }
                  openEditWeightPocketModal={() =>
                    this.props.openEditWeightPocketModal(
                      item.id,
                      item.weight,
                      item.state !== 'Unweighed',
                    )
                  }
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
          />
        )}
      </View>
    );
  }
}

PocketList.propTypes = {
  getPockets: PropTypes.func.isRequired,
  openEditIdPocketModal: PropTypes.func.isRequired,
  openEditWeightPocketModal: PropTypes.func.isRequired,
  pockets: PropTypes.array.isRequired,
  pocketsQuantity: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  pocketsQuantity: getPocketsQuantity(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditIdPocketModal: (pocket, serialNumber) =>
    dispatch(openEditIdPocketModal(pocket, serialNumber)),
  openEditWeightPocketModal: (pocket, weight, hasWeight) =>
    dispatch(openEditWeightPocketModal(pocket, weight, hasWeight)),
  getPockets: token => dispatch(getPockets(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
