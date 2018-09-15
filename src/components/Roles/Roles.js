import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextStyles from '../../helpers/TextStyles';
import Application from '../../Application';
import getRole from '../../selectors/RoleSelector';
import Button from '../common/Button';
import { selectRole } from '../../actions/RoleActions';
import styles from './styles';
import strings from '../../localization';

class Roles extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  // This method is invoked right before calling the render method, both on the initial mount and on subsequent updates.
  // We use it to detect if the role has changed to make the transition to the next screen. 
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.role !== null) {
      Application.startLoggedInApp();
    }
    return null;
  }

  constructor() {
    super();
    this.state = {};
  }

  selectRole = () => this.props.selectRole();

  render() {
    const { role } = this.props;
    return (
      <View style={styles.container}>
        <Text style={TextStyles.error}>
          Aca van los roles!
        </Text>
        <Button
          onPress={this.selectRole}
          title={strings.login}
        />
      </View>
    );
  }
}

Roles.propTypes = {
  selectRole: PropTypes.func.isRequired,
  role: PropTypes.string,
};

Roles.defaultProps = {
  role: null,
};

const mapStateToProps = state => ({
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  selectRole: () => dispatch(selectRole()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
