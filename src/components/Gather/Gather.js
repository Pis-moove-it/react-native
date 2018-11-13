import React, { Component } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import haversine from 'haversine';
import { changeRole } from '../../actions/RoleActions';
import {
  finishTravel,
  startCollection,
  getContainers,
  endCollection,
  setContainerId,
  createExtraEvent,
  setEventCoordinates,
} from '../../actions/GatherActions';
import { openCreatePocketModal } from '../../actions/CreatePocketModalActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import getCollection from '../../selectors/RouteSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import icon from '../../assets/images/MapPointIcon.png';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import eventContainerImage from '../../assets/images/MapPointIconBlue.png';
import strings from '../../localization';
import { Screens } from '../Navigation';
import CreatePocketModal from '../common/CreatePocketModal';
import CustomButton from '../common/CustomButton';
import TickIcon from '../../assets/images/Tick.png';
import {
  selectIsLoading,
  selectContainers,
  selectContainerIdSelected,
  selectIsTravelling,
  selectPocketCounter,
  selectIsLoadingEvent,
  selecteventId,
  selectEventCreatedSuccess,
} from '../../selectors/GatherSelector';
import ChangeContainerStatusModal from '../common/ChangeContainerStatusModal';
import { openChangeContainerStatusModal } from '../../actions/ContainerStatusActions';
import GatherOverlay from './GatherOverlay';
import GatherPointOptionModal from './GatherPointOptionModal';
import AddEventModal from './GatherAddEventModal';
import GatherConfirmExitTripStartedModal from './GatherConfrimExitTripStartedModal';
import stylesGather from './styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

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
      coordinates: { coords: [] },
      distanceTravelled: 0,
      prevLatLng: null,
      finish: false,
      isOptionModalVisible: false,
      isConfirmExitModalVisible: false,
      isAddEventModalVisible: false,
      confrimExitFunction: () => ({}),
      eventCoordinates: [],
      showEvents: false,
      eventList: [],
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(this.props.user);
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState(prevState => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          coordinates: {
            coords: [
              ...prevState.coordinates.coords,
              [position.coords.longitude, position.coords.latitude],
            ],
          },
          distanceTravelled:
            this.state.distanceTravelled +
            this.calcDistance([position.coords.longitude, position.coords.latitude]),
          prevLatLng: [position.coords.longitude, position.coords.latitude],
        }));
      },
      error => this.setState({ error: error.message }),
      { timeout: 20000, distanceFilter: 1 },
    );
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backButtonPressOverride,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.eventCreatedSuccess === false && nextProps.eventCreatedSuccess === true) {
      this.generateEvent();
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.backHandler.remove();
  }

  onNavigatorEvent(event) {
    if (event.id === 'logo') {
      this.toggleConfirmExitModal(() => {
        this.finishTravel();
        this.changeRole();
      });
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
      ],
      animated: false,
    });
  };

  createExtraEvent = (e) => {
    this.toggleAddEventModal();
    this.props.setEventCoordinates(e.geometry.coordinates);
    this.setState({ eventCoordinates: e.geometry.coordinates });
  };

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state;
    if (prevLatLng !== null) {
      const distance = haversine(prevLatLng, newLatLng, {
        unit: 'km',
        format: '[lon,lat]',
      }).toFixed(2);
      return Number(distance);
    }
    return 0;
  }

  backButtonPressOverride = () => {
    this.toggleConfirmExitModal(() => {
      this.finishTravel();
      this.changeRole();
    });
    return true;
  };

  toggleOptionModal = (containerId) => {
    if (!this.state.isOptionModalVisible) {
      this.props.setContainerId(containerId);
    }
    this.setState({ isOptionModalVisible: !this.state.isOptionModalVisible });
  };

  toggleCreatePocketModal = () => {
    this.toggleOptionModal();
    this.props.openCreatePocketModal();
  };

  toggleChangeContainerStatusModal = () => {
    this.toggleOptionModal();
    this.props.openChangeContainerStatusModal(this.props.containerIdSelected);
  };

  toggleConfirmExitModal = (navigationFunction) => {
    this.setState({
      isConfirmExitModalVisible: !this.state.isConfirmExitModalVisible,
      confrimExitFunction: () => {
        this.setState({ isConfirmExitModalVisible: !this.state.isConfirmExitModalVisible });
        navigationFunction();
      },
    });
  };

  toggleAddEventModal = () => {
    this.setState({ isAddEventModalVisible: !this.state.isAddEventModalVisible });
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.pop();
  };

  finishTravel = () => {
    this.setState({ finish: true });
    if (this.state.distanceTravelled === 0) {
      this.setState({ distanceTravelled: 0.01 });
    }
    this.props.endCollection(
      this.props.token,
      this.props.collectionId,
      this.state.distanceTravelled,
      this.state.coordinates.coords,
    );
    this.props.finishTravel(
      this.state.coordinates.coords,
      this.state.distanceTravelled,
      this.props.pocketCounter,
    );
  };

  completeTravel = () => {
    this.finishTravel();
    this.props.navigator.push({
      screen: Screens.TravelFinished,
      animationType: 'fade',
    });
  };

  generateEvent = () => {
    this.setState(prevState => ({
      eventList: [
        ...prevState.eventList,
        <Mapbox.PointAnnotation
          id={this.props.eventId.toString()}
          coordinate={this.state.eventCoordinates}
        >
          <TouchableOpacity>
            <Image source={eventContainerImage} style={stylesGather.trashIcon} />
          </TouchableOpacity>
        </Mapbox.PointAnnotation>,
      ],
    }));
    return this.state.eventList;
  };

  renderContainers = containers =>
    containers.map(container => (
      <Mapbox.PointAnnotation
        id={container.id.toString()}
        coordinate={[Number(container.longitude), Number(container.latitude)]}
      >
        <TouchableOpacity onPress={() => this.toggleOptionModal(container.id)}>
          <Image source={icon} style={stylesGather.trashIcon} />
        </TouchableOpacity>
      </Mapbox.PointAnnotation>
    ));

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        {!this.state.finish && !this.props.isTravelling && (
          <GatherOverlay startCollection={() => this.props.startCollection(this.props.token)} />
        )}
        <CustomButton
          style={isTablet ? stylesGather.buttonOverMapTablet : stylesGather.buttonOverMapPhone}
          icon={TickIcon}
          iconStyle={isTablet ? stylesGather.tickStyleTablet : stylesGather.tickStylePhone}
          title={strings.endTravel.toUpperCase()}
          textStyle={
            isTablet ? stylesGather.textButtonOverMapTablet : stylesGather.textButtonOverMapPhone
          }
          onPress={this.completeTravel}
        />

        <CreatePocketModal
          collectionId={this.props.collectionId}
          containerIdSelected={this.props.containerIdSelected}
        />
        <ChangeContainerStatusModal />
        <GatherPointOptionModal
          isVisible={this.state.isOptionModalVisible}
          onPressActionFst={this.toggleOptionModal}
          onPressActionSnd={this.toggleCreatePocketModal}
          onPressActionThrd={this.toggleChangeContainerStatusModal}
        />
        <GatherConfirmExitTripStartedModal
          isVisible={this.state.isConfirmExitModalVisible}
          onPressActionFst={() => {
            this.toggleConfirmExitModal(() => {});
          }}
          onPressActionSnd={this.state.confrimExitFunction}
        />
        <AddEventModal
          isVisible={this.state.isAddEventModalVisible}
          toggleModal={this.toggleAddEventModal}
          collectionId={this.props.collectionId}
        />
        <Mapbox.MapView
          onLongPress={this.createExtraEvent}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          showUserLocation
          style={stylesGather.mapContainer}
        >
          {!this.props.loading && this.renderContainers(this.props.containers)}
          {this.state.eventList}
        </Mapbox.MapView>
      </View>
    );
  }
}

Gather.propTypes = {
  changeRole: PropTypes.func.isRequired,
  finishTravel: PropTypes.func.isRequired,
  endCollection: PropTypes.func.isRequired,
  openCreatePocketModal: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  startCollection: PropTypes.func.isRequired,
  token: PropTypes.string,
  user: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  containers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setContainerId: PropTypes.func.isRequired,
  containerIdSelected: PropTypes.number.isRequired,
  isTravelling: PropTypes.bool.isRequired,
  pocketCounter: PropTypes.number.isRequired,
  openChangeContainerStatusModal: PropTypes.func.isRequired,
  createExtraEvent: PropTypes.func.isRequired,
  isCreatingEvent: PropTypes.bool.isRequired,
  eventId: PropTypes.number.isRequired,
  setEventCoordinates: PropTypes.func.isRequired,
  eventCreatedSuccess: PropTypes.bool.isRequired,
};

Gather.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  role: getRole(state),
  user: getUser(state),
  token: state.login.token,
  collectionId: getCollection(state),
  loading: selectIsLoading(state),
  containers: selectContainers(state),
  containerIdSelected: selectContainerIdSelected(state),
  isTravelling: selectIsTravelling(state),
  pocketCounter: selectPocketCounter(state),
  isCreatingEvent: selectIsLoadingEvent(state),
  eventId: selecteventId(state),
  eventCreatedSuccess: selectEventCreatedSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
  finishTravel: (coordinates, distanceTravelled, pocketCounter) =>
    dispatch(finishTravel(coordinates, distanceTravelled, pocketCounter)),
  endCollection: (token, routeId, routeLength, routeImage) =>
    dispatch(endCollection(token, routeId, routeLength, routeImage)),
  openCreatePocketModal: () => dispatch(openCreatePocketModal()),
  startCollection: token => dispatch(startCollection(token)),
  getContainers: token => dispatch(getContainers(token)),
  setContainerId: containerId => dispatch(setContainerId(containerId)),
  openChangeContainerStatusModal: container => dispatch(openChangeContainerStatusModal(container)),
  createExtraEvent: (token, routeId, description, pocket, coordinates) =>
    dispatch(createExtraEvent(token, routeId, description, pocket, coordinates)),
  setEventCoordinates: eventCoordinates => dispatch(setEventCoordinates(eventCoordinates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
