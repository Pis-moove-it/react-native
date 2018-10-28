import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import { startCollection } from '../../actions/GatherActions';
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
import stylesGather from './styles';
import GatherOverlay from './GatherOverlay';

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
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

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

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  };

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        <GatherOverlay startCollection={() => this.props.startCollection(this.props.token)} />
        <CreatePocketModal />
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
          >
            <Image source={icon} style={stylesGather.trashIcon} />
            <Mapbox.Callout title={strings.collectionPoint} />
          </Mapbox.PointAnnotation>

          <Mapbox.PointAnnotation
            key="pointAnnotation2"
            id="pointAnnotation2"
            coordinate={[-56.16574729294116, -34.90461658495409]}
          >
            <Image source={icon} style={stylesGather.trashIcon} />
            <Mapbox.Callout title={strings.collectionPoint} />
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    );
  }
}

Gather.propTypes = {
  changeRole: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
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
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
  startCollection: token => dispatch(startCollection(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
