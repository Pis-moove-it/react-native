import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRole from '../../selectors/RoleSelector';
import { getContainers } from '../../actions/GatherActions';
import Button from '../common/Button';
import { selectRole } from '../../actions/RoleActions';
import strings from '../../localization';
import Platform from '../../helpers/Platform';
import { Screens } from '../Navigation';
import styles from './styles';

class Roles extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor() {
    super();

    // TODO: Add 'portrait' and 'deviceType' to a redux prop to make it accesible from any component
    this.state = {
      portrait: Platform.isPortrait(),
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        portrait: Platform.isPortrait(),
      });
    });
  }

  selectRole = selectedRole => this.props.selectRole(selectedRole);

  selectGather = () => {
    this.props.selectRole(strings.gatherAction);
    this.props.getContainers(this.props.token);
    this.props.navigator.push({
      screen: Screens.Gather,
      animationType: 'fade',
    });
  };

  selectWeigh = () => {
    this.props.selectRole(strings.weighAction);
    this.props.navigator.push({
      screen: Screens.Weigh,
      animationType: 'fade',
    });
  };

  selectBale = () => {
    this.props.selectRole(strings.baleAction);
    this.props.navigator.push({
      screen: Screens.Bale,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.roleSelectionTitle.toUpperCase()}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={this.state.portrait ? styles.portraitButton : styles.landscapeButton}
            textStyle={styles.textButton}
            onPress={this.selectGather}
            title={strings.gatherAction.toUpperCase()}
          />
          <Button
            style={this.state.portrait ? styles.portraitButton : styles.landscapeButton}
            textStyle={styles.textButton}
            onPress={this.selectWeigh}
            title={strings.weighAction.toUpperCase()}
          />
          <Button
            style={this.state.portrait ? styles.portraitButton : styles.landscapeButton}
            textStyle={styles.textButton}
            onPress={this.selectBale}
            title={strings.baleAction.toUpperCase()}
          />
        </View>
      </View>
    );
  }
}

Roles.propTypes = {
  selectRole: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  getContainers: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  role: getRole(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  selectRole: selectedRole => dispatch(selectRole(selectedRole)),
  getContainers: token => dispatch(getContainers(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Roles);
