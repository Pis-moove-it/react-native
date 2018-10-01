import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import strings from "../../localization";
import TextStyles from "../../helpers/TextStyles";
import Button from "../common/Button";
import { logout } from "../../actions/UserActions";
import { changeRole } from "../../actions/RoleActions";
import getUser from "../../selectors/UserSelector";
import getRole from "../../selectors/RoleSelector";
import Application from "../../Application";
import Head from "../common/Head";
import { Screens } from "../Navigation";
import styles from "./styles";

class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      Application.startLoggedInApp();
    } else if (!nextProps.role) {
      this.props.navigator.push({
        screen: Screens.Roles,
        animationType: "fade"
      });
    }
    return null;
  }

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  };

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={styles.containerWrapper}>
        <Head title={this.props.user !== null ? this.props.user : "user"} />
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
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired
};

Profile.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
