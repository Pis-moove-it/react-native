import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { changeRole } from '../../actions/RoleActions';
import { finishTravel, startCollection } from '../../actions/GatherActions';
import { openCreatePocketModal } from '../../actions/CreatePocketModalActions';
import editPencil from '../../assets/ic_common/ic_editPencil.png';
import plusSign from '../../assets/ic_common/ic_add.png';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import icon from '../../assets/images/MapPointIcon.png';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import HistoryIconWhite from '../../assets/images/HistoryIconWhite.png';
import strings from '../../localization';
import { Screens } from '../Navigation';
import CreatePocketModal from '../common/CreatePocketModal';
import requestLocationPermission from '../../helpers/Permissions';
import CustomButton from '../common/CustomButton';
import TickIcon from '../../assets/images/Tick.png';
import GatherOverlay from './GatherOverlay';
import stylesGather from './styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

const GatherPointOptionModal = ({ isVisible, onPressActionFst, onPressActionSnd }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onPressActionFst}
    onBackButtonPress={onPressActionFst}
    animationOut="slideOutLeft"
  >
    <View style={stylesGather.modalContainer}>
      <View style={stylesGather.modalTitleContainer}>
        <Text style={stylesGather.modalTitle}>{strings.optionsModalGather}</Text>
      </View>
      <View>
        <CustomButton
          style={stylesGather.buttonModal}
          textStyle={stylesGather.textButton}
          title={strings.changeStateIsle}
          onPress={onPressActionFst}
          icon={editPencil}
        />
        <CustomButton
          style={stylesGather.buttonModal}
          textStyle={stylesGather.textButton}
          title={strings.newPocket}
          onPress={onPressActionSnd}
          icon={plusSign}
        />
      </View>
    </View>
  </Modal>
);

GatherPointOptionModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPressActionFst: PropTypes.func.isRequired,
  onPressActionSnd: PropTypes.func.isRequired,
};

class Gather extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        icon: Logo01,
        id: 'logo',
        buttonColor: Colors.white,
      },
    ],
    rightButtons: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      landscape: Platform.isLandscape(),
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isModalVisible: false,
  };

  componentDidMount() {
    requestLocationPermission();
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(this.props.user);
    } else {
      this.setButtonsPhone();
    }
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'sideMenuIcon':
        this.props.navigator.toggleDrawer({
          side: 'right',
          animated: true,
          to: 'open',
        });
        break;
      case 'logo':
        this.changeRole();
        break;
      default:
        break;
    }
  }

  setButtonsTablet = (name) => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'profile',
          component: 'CustomButton',
          passProps: {
            title: name,
            icon: user128,
            style: { color: Colors.white, width: 170 },
            textStyle: { margin: 10 },
            onPress: () =>
              this.props.navigator.push({
                screen: Screens.Profile,
                animationType: 'fade',
                title: strings.profile,
              }),
          },
        },
        {
          id: 'history',
          component: 'CustomButton',
          passProps: {
            title: strings.history,
            icon: HistoryIconWhite,
            style: { color: Colors.white, width: 100 },
          },
        },
      ],
      animated: false,
    });
  };

  setButtonsPhone = () => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: sideMenuIcon,
          id: 'sideMenuIcon',
          buttonColor: Colors.white,
        },
      ],
      animated: false,
    });
  };

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  toggleCreatePocketModal = () => {
    this.toggleModal();
    this.props.openCreatePocketModal();
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.push({
      screen: Screens.Roles,
      animationType: 'fade',
    });
  };

  finishTravel = () => {
    this.props.finishTravel('Miércoles 16 de Octubre', '17:05', TickIcon, 200, 25);
    this.props.navigator.push({
      screen: Screens.TravelFinished,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        <GatherOverlay startCollection={() => this.props.startCollection(this.props.token)} />
        <CustomButton
          style={isTablet ? stylesGather.buttonOverMapTablet : stylesGather.buttonOverMapPhone}
          icon={TickIcon}
          iconStyle={isTablet ? stylesGather.tickStyleTablet : stylesGather.tickStylePhone}
          title={strings.endTravel.toUpperCase()}
          textStyle={
            isTablet ? stylesGather.textButtonOverMapTablet : stylesGather.textButtonOverMapPhone
          }
          onPress={this.finishTravel}
        />
        <CreatePocketModal />
        <GatherPointOptionModal
          isVisible={this.state.isModalVisible}
          onPressActionFst={this.toggleModal}
          onPressActionSnd={this.toggleCreatePocketModal}
        />
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          showUserLocation
          style={stylesGather.mapContainer}
        >
          <Mapbox.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={[-56.165921, -34.917352]}
            selected={false}
          >
            <TouchableOpacity onPress={this.toggleModal}>
              <Image source={icon} style={stylesGather.trashIcon} />
            </TouchableOpacity>
          </Mapbox.PointAnnotation>
          <Mapbox.PointAnnotation
            id="pointAnnotation2"
            coordinate={[-56.16574729294116, -34.90461658495409]}
          >
            <TouchableOpacity onPress={this.toggleModal}>
              <Image source={icon} style={stylesGather.trashIcon} />
            </TouchableOpacity>
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    );
  }
}

Gather.propTypes = {
  changeRole: PropTypes.func.isRequired,
  finishTravel: PropTypes.func.isRequired,
  openCreatePocketModal: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  startCollection: PropTypes.func.isRequired,
  token: PropTypes.string,
  user: PropTypes.string.isRequired,
};

Gather.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  role: getRole(state),
  user: getUser(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
  finishTravel: (date, hour, travelImage, kmsTraveled, pocketsCollected) =>
    dispatch(finishTravel(date, hour, travelImage, kmsTraveled, pocketsCollected)),
  openCreatePocketModal: () => dispatch(openCreatePocketModal()),
  startCollection: token => dispatch(startCollection(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
