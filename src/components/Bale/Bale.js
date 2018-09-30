import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import PhoneBale from './PhoneBale';
import TabletBale from './TabletBale';
import styles from './styles';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

class Bale extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    console.log('render bales');
    return (
      <List containerStyle={{ marginBottom: 20 }}>
        <TabletBale id="015456" type="Plástico" weight="120" />
        <TabletBale id="056356" type="Vidrio" weight="90" />
        <PhoneBale id="04518" />
        <PhoneBale id="078999" />
        <PhoneBale id="0458789" />
      </List>
    );
  }
}

Bale.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
};

Bale.defaultProps = {
  user: null,
  role: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bale);
