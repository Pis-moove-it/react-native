import React, { Component } from 'react';
import { View, Text, Image, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Application from '../../Application';
import Button from '../common/Button';
import TextField from '../common/TextField';
import ErrorView from '../common/ErrorView';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import loadingSelector from '../../selectors/LoadingSelector';
import { errorsSelector } from '../../selectors/ErrorSelector';
import styles from './styles';

import responseJson from './users.json';

class Login extends Component {
	static navigatorStyle = {
		navBarHidden: true,
	};

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.user !== null) {
			Application.startLoggedInApp();
		}
		return null;
	}

	constructor() {
		super();
		this.state = {
			username: null,
			usersArray: null,
		};
	}

	usernameChanged = value => this.setState({ username: value });

	login = () => this.props.login(this.state.username);

	getUsers() {
		return fetch('https://facebook.github.io/react-native/movies.json')
		.then((response) => response.json())
		.then((responseJson) => {
			const usersArray = [];
			usersArray.push(
				<Picker.Item key={999} label={strings.user} value={null} />
			)
			responseJson.movies.map((user, i) => {
				usersArray.push(
					<Picker.Item key={i} label={user.title} value={user.title} />
				)
			})
			this.setState({usersArray: usersArray});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	componentDidMount() {
		this.getUsers();
	}

	render() {
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		const { isLoading, errors } = this.props;
		return (
			<View style={styles.container}>
				<Image source={require('./../../assets/images/Logo03.png')} style={styles.logo} />
				<View style={[styles.formContainer, ShadowStyles.shadow]}>
					<View style={styles.pickerContainer}>
						<Image source={require('./../../assets/ic_user/ic_user128.png')} style={styles.icon} />
						<Picker
							selectedValue={this.state.username}
							style={styles.picker}
							mode='dropdown'
							onValueChange={this.usernameChanged}
						>
							{this.state.usersArray}
						</Picker>
					</View>
					<ErrorView errors={errors} />
					<Button
						style={styles.button}
						textStyle={styles.textButton}
						onPress={this.login}
						title={isLoading ? strings.loading : strings.login}
					/>
				</View>
			</View>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	user: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
	errors: PropTypes.array,
};

Login.defaultProps = {
	user: null,
	errors: [],
};

const mapStateToProps = state => ({
	user: getUser(state),
	isLoading: loadingSelector([actionTypes.LOGIN])(state),
	errors: errorsSelector([actionTypes.LOGIN])(state),
});

const mapDispatchToProps = dispatch => ({
	login: (username) => dispatch(login(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
