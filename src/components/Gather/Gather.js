import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { isTablet } from 'react-native-device-detection';
import { connect } from 'react-redux';
import { Screens } from '../Navigation';
import Application from '../../Application';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import { changeRole } from '../../actions/RoleActions';
import HistoryButton from '../common/HistoryButton';
import stylesGather from './styles';

Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

class App extends Component {
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
  }

  componentDidMount() {
    const { name } = this.state.user;
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(name);
    } else {
      this.setButtonsPhone();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      Application.startLoggedInApp();
    } else if (!nextProps.role) {
      this.props.navigator.push({
        screen: Screens.Roles,
        animationType: 'fade',
      });
    }
    return null;
  }

  setButtonsTablet = (name) => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: user128,
          id: 'userIcon',
        },
        {
          title: name.toString(),
          id: 'username',
          buttonColor: Colors.white,
          buttonFontSize: 14,
          buttonFontWeight: '600',
        },
        {
          component: HistoryButton,
          buttonColor: Colors.white,
          id: 'algo',
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

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={stylesGather.mapContainer}>
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

App.propTypes = {
  user: PropTypes.string.isRequired,
  changeRole: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};

App.defaultProps = {};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  changeRole: () => dispatch(changeRole()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
