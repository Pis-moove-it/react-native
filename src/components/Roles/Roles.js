import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRole from '../../selectors/RoleSelector';
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
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        portrait: Platform.isPortrait(),
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.role) {
      switch (nextProps.role) {
        case strings.gatherAction:
          this.props.navigator.push({
            screen: Screens.Gather,
            animationType: 'fade',
          });
          break;
        case strings.weighAction:
          this.props.navigator.push({
            screen: Screens.Weigh,
            animationType: 'fade',
          });
          break;
        case strings.baleAction:
          this.props.navigator.push({
            screen: Screens.Bale,
            animationType: 'fade',
          });
          break;
        default:
          break;
      }
    }
  }

  selectRole = selectedRole => this.props.selectRole(selectedRole);

  selectGather = () => this.props.selectRole(strings.gatherAction);

  selectWeigh = () => this.props.selectRole(strings.weighAction);

  selectBale = () => this.props.selectRole(strings.baleAction);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {strings.roleSelectionTitle.toUpperCase()}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={
              this.state.portrait
                ? styles.portraitButton
                : styles.landscapeButton
            }
            textStyle={styles.textButton}
            onPress={this.selectGather}
            title={strings.gatherAction.toUpperCase()}
          />
          <Button
            style={
              this.state.portrait
                ? styles.portraitButton
                : styles.landscapeButton
            }
            textStyle={styles.textButton}
            onPress={this.selectWeigh}
            title={strings.weighAction.toUpperCase()}
          />
          <Button
            style={
              this.state.portrait
                ? styles.portraitButton
                : styles.landscapeButton
            }
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
  role: PropTypes.string,
  navigator: PropTypes.object.isRequired,
};

Roles.defaultProps = {
  role: false,
};

const mapStateToProps = state => ({
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  selectRole: selectedRole => dispatch(selectRole(selectedRole)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Roles);
