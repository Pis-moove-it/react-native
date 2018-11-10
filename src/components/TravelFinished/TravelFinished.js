import React, { Component } from 'react';
import { View, Text, BackHandler, Dimensions } from 'react-native';
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
import strings from '../../localization';
import { transformTime, transformDay, transformMonth } from '../../helpers/DateFormatter';
import { Screens } from '../Navigation';
import styles from '../TravelFinished/styles';

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
      portrait: Platform.isPortrait(),
      travel: {},
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        portrait: Platform.isPortrait(),
      });
    });
  }

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

  componentWillUnmount() {
    this.backHandler.remove();
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

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.popTo({
      screen: Screens.Roles,
      animated: true,
      animationType: 'fade',
    });
  };

  render() {
    if (this.state.portrait || isTablet) {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> {strings.summary} </Text>
          </View>
          <View style={styles.dateAndHourContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateAndHourTitle}> {strings.date} </Text>
              <Text style={styles.dateSubtitle}>
                {this.state.currentDayName}
                {this.state.currentDay}, {this.state.currentMonth}
                {this.state.currentYear}
              </Text>
            </View>
            <View style={styles.hourContainer}>
              <Text style={styles.dateAndHourTitle}> {strings.hour} </Text>
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
            style={styles.mapContainer}
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
              <Text style={styles.kmsAndPocketsSubtitle}>
                {this.props.kmsTraveled.toFixed(2)} km
              </Text>
            </View>
            <View style={styles.pocketsContainer}>
              <Text style={styles.kmsAndPocketsTitle}>
                {strings.pocketsCollected.toUpperCase()}
              </Text>
              <Text style={styles.kmsAndPocketsSubtitle}> {this.props.pocketsCollected} </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.containerLandscape}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={11}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          showUserLocation
          style={styles.mapContainerLandscape}
        >
          <Mapbox.ShapeSource id="routeSource" shape={this.state.travel}>
            <Mapbox.LineLayer
              id="routeFill"
              style={layerStyles.route}
              belowLayerID="originInnerCircle"
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
        <View style={styles.infoContainerLandscape}>
          <View style={styles.titleContainerLandscape}>
            <Text style={styles.title}> {strings.summary} </Text>
          </View>
          <View style={styles.dateContainerLandscape}>
            <Text style={styles.dateAndHourTitle}> {strings.date} </Text>
            <Text style={styles.dateSubtitle}>
              {this.state.currentDayName}
              {this.state.currentDay}, {this.state.currentMonth}
              {this.state.currentYear}
            </Text>
          </View>
          <View style={styles.hourContainerLandscape}>
            <Text style={styles.dateAndHourTitle}> {strings.hour} </Text>
            <Text style={styles.hourSubtitleLandscape}>
              {this.state.currentHour}:{this.state.currentMinute}
            </Text>
          </View>
          <View style={styles.kmsContainerLandscape}>
            <Text style={styles.kmsAndPocketsTitleLandscape}> {strings.kmsTraveled} </Text>
            <Text style={styles.kmsSubtitleLandscape}>{this.props.kmsTraveled.toFixed(2)} km</Text>
          </View>
          <View style={styles.pocketsContainerLandscape}>
            <Text style={styles.kmsAndPocketsTitleLandscape}>{strings.pocketsCollected}</Text>
            <Text style={styles.pocketsSubtitleLandscape}>{this.props.pocketsCollected}</Text>
          </View>
        </View>
      </View>
    );
  }
}

TravelFinished.propTypes = {
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
