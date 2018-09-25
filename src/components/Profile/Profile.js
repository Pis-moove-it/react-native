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
import Head from '../common/Head';
import user128 from '../../assets/ic_user/ic_user128.png';
import Logo01 from '../../assets/images/Logo01.png';
import Colors from '../../helpers/Colors';
import styles from './styles';

class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
  };

  static navigatorButtons = {
    leftButtons: [],
    rightButtons: [],
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user === null) {
      Application.startLoggedOutApp();
    } else if (nextProps.role === null) {
      Application.selectRole();
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  state = {};

  setButtons = (h) => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: user128,
          id: 'userIcon',
        },
        {
          title: h.toString(),
          id: 'username',
          buttonColor: Colors.white,
          buttonFontSize: 14,
          buttonFontWeight: '600',
        },
      ],
      leftButtons: [
        {
          icon: Logo01,
          id: 'logo',
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
    const { name } = this.state.user;
    this.setButtons(name);

    return (
      <View style={styles.containerWrapper}>
        <Head title={this.props.user !== null ? this.props.user : 'user'} />
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
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  user: null,
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
)(Profile);
