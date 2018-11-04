import React, { Component } from 'react';
import { View, Image, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { View, Image, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { Geolocation } from 'react-native';
import haversine from 'haversine';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import {
  finishTravel,
  startCollection,
  getContainers,
  endCollection,
} from '../../actions/GatherActions';
import { openCreatePocketModal } from '../../actions/CreatePocketModalActions';
import editPencil from '../../assets/ic_common/ic_editPencil.png';
import plusSign from '../../assets/ic_common/ic_add.png';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import getCollection from '../../selectors/RouteSelector';
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
import { selectIsLoading, selectContainers } from '../../selectors/GatherSelector';
import GatherOverlay from './GatherOverlay';
import stylesGather from './styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');
const layerStyles = Mapbox.StyleSheet.create({
  route: {
    lineColor: 'black',
    lineWidth: 8,
    lineOpacity: 0.84,
    // lineDasharray: [2,2],
  },
});

const shape = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [-56.165921, -34.917352],
      [-56.16574729294116, -34.90461658495409],
      [-56.167024, -34.7868122],
    ],
  },
};
const options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };

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
      latitude: null,
      longitude: null,
      error: null,
      coordinates: [
        /* [-56.165921, -34.917352] */
      ],
      distanceTravelled: 0,
      prevLatLng: null,
      containers: {},
      routeId: null,
      finish: false,
      isModalVisible: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  /*  state = {

  }; */

  componentWillMount() {
    // this.setState({ containers: this.props.getContainers(this.props.token) });
  }

  componentDidMount() {
    requestLocationPermission();
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(this.props.user);
    } else {
      this.setButtonsPhone();
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState(prevState => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          coordinates: [
            ...prevState.coordinates,
            [position.coords.longitude, position.coords.latitude],
          ],
          distanceTravelled:
            this.state.distanceTravelled +
            this.calcDistance([position.coords.longitude, position.coords.latitude]),
          prevLatLng: [position.coords.longitude, position.coords.latitude],
        }));
      },
      error => this.setState({ error: error.message }),
      { timeout: 20000, distanceFilter: 1 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state;
    console.log(prevLatLng);
    if (prevLatLng !== null) {
      console.log('prevCoord', prevLatLng);
      console.log('nextCoord', newLatLng);
      console.log(haversine(prevLatLng, newLatLng, { unit: 'meter', format: '[lon,lat]' }));
      const distance = haversine(prevLatLng, newLatLng, {
        unit: 'km',
        format: '[lon,lat]',
      }).toFixed(2);
      return Number(distance);
    }
    return 0;
  }

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  toggleCreatePocketModal = () => {
    this.toggleModal();
    this.props.openCreatePocketModal();
    // ACA VA LA FUNCION DE AGREGAR BOLSON
    // OBTENER EL CONTAINER ID
    // OBTENER COLLECION ID
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.push({
      screen: Screens.Roles,
      animationType: 'fade',
    });
  };

  finishTravel = () => {
    this.setState({ finish: true });
    this.props.endCollection(
      this.props.token,
      this.props.collectionId,
      this.state.distanceTravelled,
      'Image',
    );
    this.props.finishTravel(
      'Miércoles 16 de Octubre',
      '17:05',
      this.state.coordinates,
      this.state.distanceTravelled,
      25,
    );
    this.props.navigator.push({
      screen: Screens.TravelFinished,
      animationType: 'fade',
    });
  };

  renderContainers = containers =>
    containers.map(container => (
      <Mapbox.PointAnnotation
        id={container.id.toString()}
        coordinate={[Number(container.longitude), Number(container.latitude)]}
      >
        <TouchableOpacity onPress={this.toggleModal}>
          <Image source={icon} style={stylesGather.trashIcon} />
        </TouchableOpacity>
      </Mapbox.PointAnnotation>
    ));

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        {!this.state.finish && (
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
          {!this.props.loading && this.renderContainers(this.props.containers)}
        </Mapbox.MapView>
        {/* <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          <Text>Disntace: {this.state.distanceTravelled} km</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View> */}
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
  getContainers: PropTypes.func.isRequired,
  containers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
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
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
  finishTravel: (date, hour, travelImage, kmsTraveled, pocketsCollected) =>
    dispatch(finishTravel(date, hour, travelImage, kmsTraveled, pocketsCollected)),
  endCollection: (token, routeId, routeLength, routeImage) =>
    dispatch(endCollection(token, routeId, routeLength, routeImage)),
  openCreatePocketModal: () => dispatch(openCreatePocketModal()),
  startCollection: token => dispatch(startCollection(token)),
  getContainers: token => dispatch(getContainers(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
