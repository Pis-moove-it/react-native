import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import { openCreateBaleModal } from '../../actions/CreateBaleModalActions';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import ChangeRoleIcon from '../../assets/ic_common/ic_refresh.png';
import HistoryIcon from '../../assets/images/HistoryIcon.png';
import BaleIcon from '../../assets/images/BaleIcon.png';
import PocketIcon from '../../assets/images/PocketIcon.png';
import UserIcon from '../../assets/ic_user/ic_user128_green.png';
import Application from '../../Application';
import styles from './styles';
import CustomButton from './CustomButton';

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

  toggleModal = () => {
    this.props.openCreateBaleModal();
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'close',
    });
  }

  render() {
    const { role } = this.props;
    let iconRole;
    let iconText;
    let action;
    if (role === strings.gatherAction) {
      iconRole = HistoryIcon;
      iconText = strings.history;
      action = () => ({});
    } else if (role === strings.weighAction) {
      iconRole = PocketIcon;
      iconText = strings.filterByRole;
      action = () => ({});
    } else {
      iconRole = BaleIcon;
      iconText = strings.createBaleDrawer;
      action = this.toggleModal;
    }
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.topHalf}>
          <Text style={styles.textTitleStyle}>{this.props.user}</Text>
          <CustomButton
            icon={iconRole}
            title={iconText}
            textStyle={TextStyles.drawerButtons}
            style={styles.userOptionsButtonForRole}
            onPress={action}
          />
        </View>
        <View style={styles.bottomHalf}>
          <CustomButton
            title={strings.changeRole}
            icon={ChangeRoleIcon}
            textStyle={TextStyles.drawerLowerButtons}
            style={styles.userOptionsButton}
            onPress={this.changeRole}
          />
          <CustomButton
            title={strings.changeUser}
            icon={UserIcon}
            textStyle={TextStyles.drawerLowerButtons}
            style={styles.userOptionsButton}
            onPress={this.logout}
          />
        </View>
      </View>
    );
  }
}

Drawer.propTypes = {
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  openCreateBaleModal: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
  openCreateBaleModal: () => dispatch(openCreateBaleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
