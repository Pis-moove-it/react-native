import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Application from '../../Application';
import { Screens } from '../Navigation';
import Colors from '../../helpers/Colors';
import ChangeRoleIcon from '../../assets/ic_common/ic_refresh.png';
import UserIcon from '../../assets/ic_user/ic_user128_green.png';
import Logo01 from '../../assets/images/Logo01.png';
import CustomButton from '../common/CustomButton';
import styles from './styles';

class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
    title: strings.profile,
    navBarTextColor: Colors.white,
    navBarTitleTextCentered: true,
    navBarTextFontSize: 22,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        buttonColor: Colors.white,
      },
    ],
    rightButtons: [],
  };

  logout = () => {
    this.props.logout();
    this.props.changeRole();
    Application.startLoggedInApp();
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.push({
      screen: Screens.Roles,
      animationType: 'fade',
    });
  };

  render() {
    const { user } = this.props;
    return (
      <View style={{ flex: 10 }}>
        <View style={styles.imageContainer}>
          <Image source={Logo01} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.leftColumn}>
            <Text style={TextStyles.lowerButtons}>{`${strings.user}: `}</Text>
            <Text style={TextStyles.lowerButtons}>{`${strings.role}: `}</Text>
          </View>
          <View style={styles.middleColumn}>
            <Text style={TextStyles.lowerButtons}>{user.name}</Text>
            <Text style={TextStyles.lowerButtons}>{this.props.role}</Text>
          </View>
          <View style={styles.rightColumn}>
            <CustomButton
              title={strings.changeUser}
              icon={UserIcon}
              textStyle={TextStyles.lowerButtons}
              style={styles.userOptionsButton}
              onPress={this.logout}
            />
            <CustomButton
              title={strings.changeRole}
              icon={ChangeRoleIcon}
              textStyle={TextStyles.lowerButtons}
              style={styles.userOptionsButton}
              onPress={this.changeRole}
            />
          </View>
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
