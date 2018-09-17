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
import { Dimensions } from 'react-native';
import Platform from '../../helpers/Platform';

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

		// TODO: Add 'portrait' and 'deviceType' to a redux prop to make it accesible from any component
		this.state = {
			portrait: Platform.isPortrait(),
			deviceType: Platform.isTablet() ? 'tablet' : 'phone'
		};

		// Event Listener for orientation changes
		Dimensions.addEventListener('change', () => {
				this.setState({
						portrait: Platform.isPortrait()
				});
		});
	}

	selectRole = selectedRole => this.props.selectRole(selectedRole);

	selectGather = () => this.props.selectRole(strings.gatherAction);
	selectWeigh = () => this.props.selectRole(strings.weighAction);
	selectBale = () => this.props.selectRole(strings.baleAction);

	render() {
		const { role } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						{strings.roleSelectionTitle.toUpperCase()}
					</Text>
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
	role: PropTypes.string,
};

Roles.defaultProps = {
	role: null,
};

const mapStateToProps = state => ({
	role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
	selectRole: selectedRole => dispatch(selectRole(selectedRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
