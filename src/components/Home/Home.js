import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import styles from './styles';

class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    const { user } = this.props;
    const { role } = this.props;
    return (
      <View style={styles.container}>
        <Text style={TextStyles.lightTitle}>
          {strings.home}
        </Text>
        <Text>
          {`${strings.homeMessage} ${user && user.name}\n`}
          {`${user && user.name} is working as a ${role}`}
        </Text>
      </View>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
};

Home.defaultProps = {
  user: null,
  role: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
