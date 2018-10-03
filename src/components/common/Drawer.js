import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Button from './Button';
import styles from './styles';

class Drawer extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  };

  changeRole = () => {
    this.props.changeRole();
    this.props.navigator.toggleDrawer({
      side: 'right',
      animated: true,
      to: 'close',
    });
  };

  render() {
    const { user } = this.props;
    const { role } = this.props;
    return (
      <View style={styles.containerWrapper}>
        <View style={styles.topHalf}>
          <Text style={TextStyles.fieldTitle}> {`${user.name}`} </Text>
          <Text style={TextStyles.fieldTitle}> {`${role}`} </Text>
          {
            {
              Gather: (
                <Button
                  style={styles.button}
                  // textStyle={styles.text}
                  title="Historial"
                  onPress={this.changeRole}
                />
              ),
              Weigh: (
                <Button
                  style={styles.button}
                  // textStyle={styles.text}
                  title="weigh button"
                  // onPress={this.changeRole}
                />
              ),
              Bale: (
                <Button
                  style={styles.button}
                  // textStyle={styles.text}
                  title="bale button"
                  // onPress={this.changeRole}
                />
              ),
            }[role]
          }
        </View>
        <View style={styles.bottomHalf}>
          <Button
            style={styles.button}
            // textStyle={styles.text}
            title={strings.changeRole}
            onPress={this.changeRole}
          />
          <Button
            style={styles.button}
            // textStyle={styles.text}
            title={strings.changeUser}
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
