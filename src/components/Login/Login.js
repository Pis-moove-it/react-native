import React, { Component } from 'react';
import { View, Image, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Application from '../../Application';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import Colors from '../../helpers/Colors';
import ShadowStyles from '../../helpers/ShadowStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelector';
import loadingSelector from '../../selectors/LoadingSelector';
import { fetchData } from '../../actions/APIActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import styles from './styles';
import reciclandoLogo from './../../assets/images/Logo03.png';
import avatar from './../../assets/ic_user/ic_user128.png';


class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user !== null) {
      Application.selectRole();
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      identifier: null,
      username: null,
      loading: false,
    };
  }


  componentDidMount() {
    this.props.fetchData();
  }

  getUsers() {
    const usersData = [];
    usersData.push(<Picker.Item key={999} label={strings.user} value={null} />);
    this.props.users.data.map((user, identifier) => {
      return usersData.push(<Picker.Item key={identifier} label={`${user.name} ${user.surname}`} value={`${user.name} ${user.surname}`} />);
    });
    return usersData;
  }


  login = () => {
    this.setState({ loading: true });
    this.props.login(this.state.identifier, this.state.username);
  };

  usernameChanged = (itemValue, itemIndex) => {
    this.setState({ identifier: itemIndex, username: itemValue });
  }

  render() {
    const { errors } = this.props;
    let loading = this.state.loading;
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
              mode='dialog'
              onValueChange={this.usernameChanged}
            >
              {this.getUsers()}
            </Picker>
          </View>
          <ErrorView errors={errors} />
          {loading && errors.length < 1 ?
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          :
            <Button
              style={styles.button}
              textStyle={styles.textButton}
              onPress={this.state.username !== null ? this.login : null}
              title={strings.login}
            />
          }
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.array,
  fetchData: PropTypes.func,
  users: PropTypes.object,
};

Login.defaultProps = {
  errors: [],
  fetchData: null,
  users: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
  isLoading: loadingSelector([actionTypes.LOGIN])(state),
  errors: errorsSelector([actionTypes.LOGIN])(state),
  users: state.data,
});

const mapDispatchToProps = dispatch => ({
  login: (identifier, username) => dispatch(login(identifier, username)),
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
