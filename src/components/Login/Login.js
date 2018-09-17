import React, { Component } from 'react';
import { Alert, View, Image, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Application from '../../Application';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import { login, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelector';
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
      Application.selectRole();
    }
    return null;
  }

	constructor() {
		super();
		this.state = {
			identifier: null,
			username: null,
		};
	}

	usernameChanged = (itemValue, itemIndex) => this.setState({identifier: itemIndex, username: itemValue});

	login = () => this.props.login(this.state.identifier, this.state.username);

	getUsers() {
		var usersData = [];
		usersData.push(<Picker.Item key={999} label={strings.user} value={null} />)
		this.props.users.data.map((user, identifier) => {
			usersData.push( <Picker.Item key={identifier} label={`${user.name} ${user.surname}`} value={`${user.name} ${user.surname}`} />)
		})
		return usersData;
	}

	componentDidMount() {
		this.props.fetchData();
	}

	render() {
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		const {isLoading, errors} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Image source={require('./../../assets/images/Logo03.png')} style={styles.logo} />
				</View>
				<View style={[styles.bottomContainer, ShadowStyles.shadow]}>
					<View style={styles.pickerContainer}>
						<Image source={require('./../../assets/ic_user/ic_user128.png')} style={styles.icon} />
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
					<Button
						style={styles.button}
						textStyle={styles.textButton}
						onPress={this.state.username !== null ? this.login : null}
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
	login: (identifier, username) => dispatch(login(identifier, username)),
	fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
