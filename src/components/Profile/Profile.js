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
import Head from '../common/Head';

class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: true,
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

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  }

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={styles.containerWrapper}>
        <Head title={this.props.user !== null ? this.props.user : 'user'} />
        <View style={styles.container}>
          <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
          <Text>
            {strings.profileMessage}
          </Text>
          <Button
            style={styles.button}
            textStyle={styles.text}
            title={strings.changeRole}
            onPress={this.changeRole}
          />
          <Button
            style={styles.button}
            textStyle={styles.text}
            title={strings.logout}
            onPress={this.logout}
          />
        </View>
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
