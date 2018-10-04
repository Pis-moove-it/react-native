import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import ChangeRoleIcon from '../../assets/ic_common/ic_refresh.png';
import HistoryIcon from '../../assets/images/HistoryIcon.png';
import BaleIcon from '../../assets/images/BaleIcon.png';
import PocketIcon from '../../assets/images/PocketIcon.png';
import UserIcon from '../../assets/ic_user/ic_user128.png';
import Colors from '../../helpers/Colors';
import styles from './styles';
import CustomButton from './CustomButton';
import Application from '../../Application';

class Drawer extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  logout = () => {
    this.props.logout();
    this.props.changeRole();
    Application.startLoggedInApp();
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'close',
    });
    this.props.navigator.pop();
  };

  render() {
    const { user } = this.props;
    const { role } = this.props;
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.topHalf}>
          <Text style={TextStyles.fieldTitle}> {`${user.name}`} </Text>
          {
            {
              Gather: (
                <CustomButton
                  icon={HistoryIcon}
                  title={strings.history}
                  textStyle={{ color: Colors.black }}
                  onPress={this.changeRole}
                />
              ),
              Weigh: (
                <CustomButton
                  icon={PocketIcon}
                  title="weigh button"
                  textStyle={{ color: Colors.black }}
                  style={{ width: 120 }}
                  onPress={this.changeRole}
                />
              ),
              Bale: (
                <CustomButton
                  icon={BaleIcon}
                  title="bale button"
                  textStyle={{ color: Colors.black }}
                  onPress={this.changeRole}
                />
              ),
            }[role]
          }
        </View>
        <View style={styles.bottomHalf}>
          <CustomButton
            title={strings.changeRole}
            icon={ChangeRoleIcon}
            textStyle={{ margin: 10, color: Colors.black }}
            style={{ width: 130 }}
            onPress={this.changeRole}
          />
          <CustomButton
            title={strings.changeUser}
            icon={UserIcon}
            textStyle={{ margin: 10, color: Colors.black }}
            style={{ width: 130 }}
            onPress={this.logout}
          />
        </View>
      </View>
    );
  }
}

Drawer.propTypes = {
  user: PropTypes.string,
  role: PropTypes.string,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

Drawer.defaultProps = {
  user: 'not assigned',
  role: 'not assigned',
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
)(Drawer);
