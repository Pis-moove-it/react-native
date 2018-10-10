import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import Logo01 from '../../assets/images/Logo01.png';
import ChangeRoleIcon from '../../assets/ic_common/ic_refresh.png';
import UserIcon from '../../assets/ic_user/ic_user128_green.png';
import CustomButton from '../common/CustomButton';
import commonStyles from '../common/styles';
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
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.leftColumn}>
            <Text style={TextStyles.drawerLowerButtons}>{`${strings.user}: ${user.name}`}</Text>
            <Text style={TextStyles.drawerLowerButtons}>
              {`${strings.role}: ${this.props.role}`}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <CustomButton
              title={strings.changeUser}
              icon={UserIcon}
              textStyle={TextStyles.drawerLowerButtons}
              style={styles.userOptionsButton}
              onPress={this.logout}
            />
            <CustomButton
              title={strings.changeRole}
              icon={ChangeRoleIcon}
              textStyle={TextStyles.drawerLowerButtons}
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
