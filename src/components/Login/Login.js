import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import {ScrollView, Text, TextInput, View, Button, Image, StyleSheet, Picker} from 'react-native';
import {login} from '../../actions/authorisation';

import users from './users.json';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			usersArray: null,
		};
	}

	userLogin(e) {
		this.props.onLogin(this.state.username);
		e.preventDefault();
	}

	getUsers() {
		//return fetch('https://facebook.github.io/react-native/movies.json')
		//.then((response) => response.json())
		//.then((responseJson) => {
			const usersArray = [];
			users.map((user, i) => {
				usersArray.push(
					<Picker.Item key={i} label={user.name} value={user.name} />
				)
			})
			this.setState({usersArray: usersArray});
		//})
		//.catch((error) => {
		//	console.error(error);
		//});
	}

	componentWillMount() {
		this.getUsers();
	}

	render() {
		return (
			<ScrollView>
				<Image source={require('./../../assets/img/Logo03.png')} style={styles.logo} />
				<View style={styles.container}>
					<View style={styles.section}>
						<Icon style={styles.sectionIcon} name='user' size={20} />
						<Picker
							selectedValue={this.state.username}
							style={styles.sectionPicker}
							mode='dialog'
							onValueChange={(itemValue, itemIndex) => this.setState({username: itemValue})}>
								{this.state.usersArray}
						</Picker>
					</View>
					<View style={styles.sectionButton}>
						<Button color='#02A397' onPress={(e) => this.userLogin(e)} title="Entrar" />
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.authorisation.isLoggedIn
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (username) => {dispatch(login(username));}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		alignSelf: 'center',
		height: 150,
		width: 150,
	},
	section: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		flexDirection: 'row',
		width: 150,
	},
	sectionIcon: {
		padding: 10,
		color: '#d6d7da',
	},
	sectionPicker: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		color: 'black',
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
