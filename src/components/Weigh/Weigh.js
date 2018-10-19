import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import PocketList from '../Pocket/PocketList';
import { Screens } from '../Navigation';
import strings from '../../localization';

class Weigh extends Component {
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
    return <PocketList />;
  }
}

Weigh.propTypes = {
  user: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

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
)(Weigh);
