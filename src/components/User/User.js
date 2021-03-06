import React, { Component } from 'react';
import { View, Image, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isPhone } from 'react-native-device-detection';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import Colors from '../../helpers/Colors';
import ShadowStyles from '../../helpers/ShadowStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import { fetchUsers } from '../../actions/UsersAPIActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import { Screens } from '../Navigation';
import styles from './styles';
import reciclandoLogo from './../../assets/images/Logo03.png';
import avatar from './../../assets/ic_user/ic_user128.png';

class User extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor() {
    super();
    this.state = {
      identifier: false,
    };
  }

  componentDidMount() {
    this.props.fetchData(this.props.token, this.props.organization);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && nextProps.user) {
      this.props.navigator.push({
        screen: Screens.Roles,
        animationType: 'fade',
      });
    }
  }

  getUsers() {
    const usersData = [];
    usersData.push(<Picker.Item key={999} label={strings.selectUser} value={false} />);
    this.props.dataFetch.map((user, identifier) => {
      usersData.push(<Picker.Item key={identifier} label={`${user.name} ${user.surname}`} value={user.id} />);
    });
    return usersData;
  }

  login = () => this.props.login(this.props.token, this.props.organization, this.state.identifier);

  usernameChanged = (itemValue, itemIndex) => {
    this.setState({ identifier: itemValue });
  };

  render() {
    const { errors } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={reciclandoLogo} style={isPhone ? styles.logo : styles.logoTablet} />
        </View>
        <View style={[styles.bottomContainer, ShadowStyles.shadow]}>
          {this.props.dataFetch.length > 0 ? (
            <View style={isPhone ? styles.pickerContainer : styles.pickerContainerTablet}>
              <Image source={avatar} style={styles.icon} />
              <Picker
                selectedValue={this.state.identifier}
                style={isPhone ? styles.picker : styles.pickerTablet}
                mode="dialog"
                onValueChange={this.usernameChanged}
              >
                {this.getUsers()}
              </Picker>
            </View>
          ) : (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
          <ErrorView errors={errors} />
          {this.props.isLoading && errors.length < 1 ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <Button
              style={isPhone ? styles.button : styles.buttonTablet}
              textStyle={isPhone ? styles.textButton : styles.textButtonTablet}
              onPress={this.state.identifier ? this.login : null}
              title={strings.enter}
            />
          )}
        </View>
      </View>
    );
  }
}

User.propTypes = {
  dataFetch: PropTypes.array.isRequired,
  errors: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  organization: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
};

User.defaultProps = {
  errors: [],
  isLoading: false,
  organization: false,
  user: false,
  token: false,
};

const mapStateToProps = state => ({
  dataFetch: state.users.users,
  errors: errorsSelector([actionTypes.USER_LOGIN])(state),
  isLoading: state.user.isLoading,
  organization: state.login.identifier,
  user: state.user.user,
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (token, organization) => dispatch(fetchUsers(token, organization)),
  login: (token, organization, user) => dispatch(login(token, organization, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
