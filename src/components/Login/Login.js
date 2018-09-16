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
import { fetchData } from '../../actions/APIActions'

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
			id: null,
			username: null,
			usersArray: null,
		};
	}

	usernameChanged = (value, index) => this.setState({ id: index, username: value});

	login = () => this.props.login(this.state.username);

	getUsers() {
		const {users} = this.props;
		return usersData = users.data.map((user, id) => {
			return <Picker.Item 
				key={id}
				label={`${user.name} ${user.surname}`}
				value={`${user.name} ${user.surname}`}
			/>
		})
	}

	componentDidMount() {
		this.props.fetchData();
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
							selectedValue={this.state.id}
							style={styles.picker}
							mode='dropdown'
							onValueChange={this.usernameChanged}
						>
							{this.getUsers()}
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
	users: state.data,
});

const mapDispatchToProps = dispatch => ({
	login: (username) => dispatch(login(username)),
	fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
