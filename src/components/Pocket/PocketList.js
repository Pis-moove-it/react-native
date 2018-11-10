import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditIdPocketModal } from '../../actions/EditIdPocketModalActions';
import { openEditWeightPocketModal } from '../../actions/EditWeightPocketModalActions';
import { getPockets } from '../../actions/PocketActions';
import EditIdPocketModal from '../common/EditIdPocketModal';
import EditWeightPocketModal from '../common/EditWeightPocketModal';
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pockets) {
      return {
        prevState,
        currentPockets: nextProps.pockets,
      };
    }
    return prevState;
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      nextPage: 2,
      currentPockets: [],
    };
  }

  componentDidMount = () => {
    this.setState({ refreshing: true, currentPockets: [] });
    this.props.getPockets(this.props.token, 1).then(() => {
      this.setState({ refreshing: false, currentPockets: this.props.pockets, nextPage: 2 });
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true, currentPockets: [] });
    this.props.getPockets(this.props.token, 1).then(() => {
      this.setState({ refreshing: false, currentPockets: this.props.pockets, nextPage: 2 });
    });
  };

  onEnd = () => {
    this.setState({ refreshing: true });
    this.props.getPockets(this.props.token, this.state.nextPage).then(() => {
      this.setState({
        refreshing: false,
        currentPockets: this.state.currentPockets.concat(this.props.pockets),
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
        <EditIdPocketModal />
        <EditWeightPocketModal />
        <FlatList
          data={this.state.currentPockets}
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
  openEditIdPocketModal: PropTypes.func.isRequired,
  openEditWeightPocketModal: PropTypes.func.isRequired,
  pockets: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditIdPocketModal: (pocket, serialNumber) =>
    dispatch(openEditIdPocketModal(pocket, serialNumber)),
  openEditWeightPocketModal: (pocket, weight, hasWeight) =>
    dispatch(openEditWeightPocketModal(pocket, weight, hasWeight)),
  getPockets: (token, nextPage) => dispatch(getPockets(token, nextPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
