import React, { Component } from 'react';
import { View, Image, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      username: false,
    };
  }

  componentDidMount() {
    this.props.fetchData();
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
    usersData.push(
      <Picker.Item
        key={999}
        label={strings.selectUser}
        value={false}
      />,
    );
    this.props.dataFetch.map((user, identifier) => {
      usersData.push(
        <Picker.Item
          key={identifier}
          label={`${user.name} ${user.surname}`}
          value={`${user.name} ${user.surname}`}
        />,
      );
    });
    return usersData;
  }

  login = () => this.props.login(this.state.identifier, this.state.username);

  usernameChanged = (itemValue, itemIndex) => {
    this.setState({ identifier: itemIndex, username: itemValue });
  };

  render() {
    const { errors } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={reciclandoLogo} style={styles.logo} />
        </View>
        <View style={[styles.bottomContainer, ShadowStyles.shadow]}>
          <View style={styles.pickerContainer}>
            <Image source={avatar} style={styles.icon} />
            <Picker
              selectedValue={this.state.username}
              style={styles.picker}
              mode="dialog"
              onValueChange={this.usernameChanged}
            >
              {this.getUsers()}
            </Picker>
          </View>
          <ErrorView errors={errors} />
          {this.props.isLoading && errors.length < 1 ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <Button
              style={styles.button}
              textStyle={styles.textButton}
              onPress={this.state.username ? this.login : null}
              title={strings.selectUser}
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
  user: PropTypes.string,
};

User.defaultProps = {
  errors: [],
  isLoading: false,
  user: false,
};

const mapStateToProps = state => ({
  dataFetch: state.users.users,
  errors: errorsSelector([actionTypes.USER_LOGIN])(state),
  isLoading: state.user.isLoading,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchUsers()),
  login: (identifier, username) => dispatch(login(identifier, username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
