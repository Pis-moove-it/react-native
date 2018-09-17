import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {Header, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../localization';
import TextStyles from '../../helpers/TextStyles';
import Colors from '../../helpers/Colors';
import Button from '../common/Button';
import { logout } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import Application from '../../Application';
import styles from './styles';
import Head from '../common/Head'

class Profile extends Component {

  
  static navigatorStyle = {
    navBarHidden: true,
  };

  /*
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../assets/images/InWarehouseIcon.png'), 
        id: 'userImage' 
      },
      {
        title: 'Jorge test',
        id: 'nameOfUser'
      }
    ],
    leftButtons: [
      {
      icon: require('../../assets/images/Logo01.png'),
      id: 'logo'
      }
    ]
  }; */

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user === null) {
      Application.startLoggedOutApp();
    }
    return null;
  }

  state = {};

  logout = () => this.props.logout();

  render() {
    return (
      <View style={{flex: 1}}>
        <Head title={this.props.user}/>
        <View style={styles.container}>
            
          <Text style={TextStyles.fieldTitle}> {strings.profile} </Text>
          <Text>
            {strings.profileMessage}
          </Text>
          <Button
            title={strings.logout}
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
};

Profile.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
