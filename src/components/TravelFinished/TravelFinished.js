import React, { Component } from 'react';
import { View, Image, Text, BackHandler } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import {
  getCoordinates,
  getKmsTraveled,
  getPocketsCollected,
} from '../../selectors/GatherSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import HistoryIconWhite from '../../assets/images/HistoryIconWhite.png';
import strings from '../../localization';
import { Screens } from '../Navigation';
import { transformTime, transformDay, transformMonth } from '../../helpers/DateFormatter';
import styles from '../TravelFinished/styles';
import stylesGather from '../Gather/styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');
const layerStyles = Mapbox.StyleSheet.create({
  route: {
    lineColor: 'green',
    lineWidth: 6,
    lineOpacity: 0.84,
  },
});

class TravelFinished extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
    title: strings.summary,
    navBarTextColor: Colors.white,
    navBarTitleTextCentered: true,
    navBarTextFontSize: 22,
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
      travel: {},
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isModalVisible: false,
  };

  componentWillMount() {
    this.state.travel = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: this.props.coordinates,
      },
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      this.props.navigator.pop();
      return true;
    });

    setInterval(() => {
      this.setState({
        currentYear: new Date().getFullYear().toLocaleString(),
        currentMonth: transformMonth(new Date().getMonth()),
        currentDay: new Date().getDate().toLocaleString(),
        currentDayName: transformDay(new Date().getDay()),
        currentHour: transformTime(new Date().getHours()),
        currentMinute: transformTime(new Date().getMinutes()),
      });
    }, 1000);
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'logo':
        this.changeRole();
        break;
      default:
        break;
    }
  }

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.push({
      screen: Screens.Roles,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> {strings.summary} </Text>
        </View>
        <View style={styles.resumeAndHourContainer}>
          <View style={styles.resumeContainer}>
            <Text style={styles.resumeAndHourTitle}> Fecha </Text>
            <Text style={styles.resumeSubtitle}>
              {this.state.currentDayName}
              {this.state.currentDay}, {this.state.currentMonth}
              {this.state.currentYear}
            </Text>
          </View>
          <View style={styles.hourContainer}>
            <Text style={styles.resumeAndHourTitle}> {strings.hour} </Text>
            <Text style={styles.hourSubtitle}>
              {this.state.currentHour}:{this.state.currentMinute}
            </Text>
          </View>
        </View>

        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={11}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          showUserLocation
          style={stylesGather.mapContainer}
        >
          <Mapbox.ShapeSource id="routeSource" shape={this.state.travel}>
            <Mapbox.LineLayer
              id="routeFill"
              style={layerStyles.route}
              belowLayerID="originInnerCircle"
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>

        <View style={styles.kmsAndPocketsContainer}>
          <View style={styles.kmsContainer}>
            <Text style={styles.kmsAndPocketsTitle}> {strings.kmsTraveled.toUpperCase()} </Text>
            <Text style={styles.kmsAndPocketsSubtitle}>{this.props.kmsTraveled.toFixed(2)} km</Text>
          </View>
          <View style={styles.pocketsContainer}>
            <Text style={styles.kmsAndPocketsTitle}>{strings.pocketsCollected.toUpperCase()}</Text>
            <Text style={styles.kmsAndPocketsSubtitle}> {this.props.pocketsCollected} </Text>
          </View>
        </View>
      </View>
    );
  }
}

TravelFinished.propTypes = {
  user: PropTypes.string.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  coordinates: PropTypes.object.isRequired,
  kmsTraveled: PropTypes.number.isRequired,
  pocketsCollected: PropTypes.number.isRequired,
};

TravelFinished.defaultProps = {};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
  coordinates: getCoordinates(state),
  kmsTraveled: getKmsTraveled(state),
  pocketsCollected: getPocketsCollected(state),
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelFinished);
