import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import HistoryIconWhite from '../../assets/images/HistoryIconWhite.png';
import strings from '../../localization';
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
      user: props.user,
      landscape: Platform.isLandscape(),
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  state = {
    isModalVisible: false,
  };

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  componentDidMount() {
    const { name } = this.state.user;
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(name);
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
            title: name.toString(),
            icon: user128,
            style: { color: Colors.white, width: 150 },
            textStyle: { margin: 10 },
          },
        },
        {
          id: 'history',
          component: 'CustomButton',
          passProps: {
            title: strings.history,
            icon: HistoryIconWhite,
            style: { color: Colors.white },
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
        <GatherOverlay />
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.77]}
          style={stylesGather.mapContainer}
        />
      </View>
    );
  }
}

Gather.propTypes = {
  user: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

Gather.defaultProps = {};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
