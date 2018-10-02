import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Colors from '../../helpers/Colors';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import Button from './Button';

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
      side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'close',
    });
  };

  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  containerWrapper: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  },
});

Drawer.propTypes = {};

Drawer.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
