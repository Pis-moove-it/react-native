import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isPhone } from 'react-native-device-detection';
import Button from '../common/Button';
import TextField from '../common/TextField';
import ErrorView from '../common/ErrorView';
import Colors from '../../helpers/Colors';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/LoginActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import Application from '../../Application';
import styles from './styles';

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor() {
    super();
    this.state = {
      organization: false,
      password: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && nextProps.organization) {
      Application.startLoggedInApp();
    }
  }

  passwordChanged = passwordValue => this.setState({ password: passwordValue });

  organizationChanged = organizationValue => this.setState({ organization: organizationValue });

  login = () => this.props.login(this.state.organization, this.state.password);

  render() {
    const { errors } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.formContainer, ShadowStyles.shadow]}>
          <Text style={isPhone ? TextStyles.fieldTitle : TextStyles.fieldTitleTablet}>
            {strings.organization}
          </Text>
          <TextField
            placeholder={strings.organization}
            onChangeText={this.organizationChanged}
            value={this.state.organization}
            style={isPhone ? styles.textField : styles.textFieldTablet}
          />
          <Text style={isPhone ? TextStyles.fieldTitle : TextStyles.fieldTitleTablet}>
            {strings.password}
          </Text>
          <TextField
            placeholder={strings.password}
            value={this.state.password}
            onChangeText={this.passwordChanged}
            style={isPhone ? styles.textField : styles.textFieldTablet}
            secureTextEntry
          />
          <ErrorView errors={errors} />
          {this.props.isLoading && errors.length < 1 ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <Button
              onPress={this.state.organization ? this.login : null}
              title={strings.login}
              style={isPhone ? styles.button : styles.buttonTablet}
              textStyle={isPhone ? styles.buttonText : styles.buttonTextTablet}
            />
          )}
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  organization: PropTypes.object,
  errors: PropTypes.array,
};

Login.defaultProps = {
  organization: false,
  isLoading: false,
  errors: [],
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  organization: state.login.organization,
  errors: errorsSelector([actionTypes.LOGIN])(state),
});

const mapDispatchToProps = dispatch => ({
  login: (organization, password) => dispatch(login(organization, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
