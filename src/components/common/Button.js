import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default class Button extends Component {
	render() {
		return (
			<TouchableOpacity style={this.props.styleContainer}>
				<Text style={this.props.styleText}>
					{this.props.text}
				</Text>
			</TouchableOpacity>
		);
	}
};
