import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import Application from './src/components/Home/Application';
import store from './src';

export default class Reciclando extends Component {
	render() {
		return (
			<Provider store={store}>
				<Application />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Reciclando', () => Reciclando);
