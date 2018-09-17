import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import Colors from '../../helpers/Colors';
import Button from '../common/Button';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Application from '../../Application';
import styles from './styles';

class Profile extends Component {
  static navigatorStyle = {
    title: 'Profile',
    navBarTextColor: Colors.white,
    navBarBackgroundColor: Colors.primary,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user === null) {
      Application.startLoggedOutApp();
    } else if (nextProps.role === null) {
      Application.selectRole();
    }
    return null;
  }

  state = {};

  logout = () => this.props.logout();

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={styles.container}>
        <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
        <Text>
          {strings.profileMessage}
        </Text>
        <Button
          title={strings.logout}
          onPress={this.logout}
        />
        <Button
          title={strings.changeRole}
          onPress={this.changeRole}
        />
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  role: PropTypes.string,
  changeRole: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  user: null,
  role: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
