import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditPocketModal } from '../../actions/EditPocketModalActions';
import { getPockets } from '../../actions/PocketActions';
import EditPocketModal from '../common/EditPocketModal';
import CustomButton from '../common/CustomButton';
import strings from '../../localization';
import { pockets } from '../../selectors/PocketSelector';
import Colors from '../../helpers/Colors';
import TabletPocket from './TabletPocket';
import PhonePocket from './PhonePocket';

export class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      nextPage: 2,
    };
  }

  componentDidMount = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, [], 1).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, [], 1).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onEnd = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, this.props.pockets, this.state.nextPage).then(() => {
      this.setState({
        refreshing: false,
        nextPage: this.state.nextPage + 1,
      });
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
        <EditPocketModal />
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
                  openEditPocketModal={() =>
                    this.props.openEditPocketModal(
                      item.id,
                      item.serial_number,
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
                openEditPocketModal={() =>
                  this.props.openEditPocketModal(
                    item.id,
                    item.serial_number,
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
        <CustomButton
          onPress={this.onEnd}
          textStyle={{ color: Colors.primary }}
          title={strings.moreContent}
        />
      </View>
    );
  }
}

PocketList.propTypes = {
  getPockets: PropTypes.func.isRequired,
  openEditPocketModal: PropTypes.func.isRequired,
  pockets: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditPocketModal: (pocket, serialNumber, weight, hasWeight) =>
    dispatch(openEditPocketModal(pocket, serialNumber, weight, hasWeight)),
  getPockets: (token, pocketsArray, nextPage) =>
    dispatch(getPockets(token, pocketsArray, nextPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
