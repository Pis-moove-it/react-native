import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import Button from '../common/Button';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Application from '../../Application';
import { Screens } from '../Navigation';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import styles from './styles';

class Profile extends Component {
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
    rightButtons: [
      {
        title: 'Volver',
        id: 'back',
        buttonColor: Colors.white,
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      landscape: Platform.isLandscape(),
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'back':
        this.props.navigator.pop({
          animated: true,
          animationType: 'fade',
        });
        break;
      default:
        break;
    }
  }

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  };

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
          <Text>{strings.profileMessage}</Text>
          <Button
            style={styles.button}
            textStyle={styles.text}
            title={strings.changeRole}
            onPress={this.changeRole}
          />
          <Button
            style={styles.button}
            textStyle={styles.text}
            title={strings.changeUser}
            onPress={this.logout}
          />
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

Profile.defaultProps = {};

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
)(Profile);
