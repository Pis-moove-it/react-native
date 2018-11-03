import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import {
  getDate,
  getHour,
  getImage,
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
import styles from '../TravelFinished/styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

class TravelFinished extends Component {
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

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.push({
      screen: Screens.Roles,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View>
        <View style={styles.resumeAndHourContainer}>
          <View style={styles.resumeContainer}>
            <Text style={styles.resumeAndHourTitle}> {strings.summary} </Text>
            <Text style={styles.resumeAndHourSubtitle}> {this.props.date} </Text>
          </View>
          <View style={styles.hourContainer}>
            <Text style={styles.resumeAndHourTitle}> {strings.hour} </Text>
            <Text style={styles.resumeAndHourSubtitle}>
              {this.props.hour}
              hs
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={this.props.travelImage} />
        </View>
        <View style={styles.kmsAndPocketsContainer}>
          <View style={styles.kmsContainer}>
            <Text style={styles.kmsAndPocketsTitle}> {strings.kmsTraveled.toUpperCase()} </Text>
            <Text style={styles.kmsAndPocketsSubtitle}> {this.props.kmsTraveled} </Text>
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
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  travelImage: PropTypes.object.isRequired,
  kmsTraveled: PropTypes.number.isRequired,
  pocketsCollected: PropTypes.number.isRequired,
};

TravelFinished.defaultProps = {};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
  date: getDate(state),
  hour: getHour(state),
  travelImage: getImage(state),
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
