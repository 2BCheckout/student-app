import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button
} from 'react-native';
import { login } from './LoginService';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		}
	}

	_setUsername = (username) => {
		this.setState({...this.state, username});
	}

	_setPassword = (password) => {
		this.setState({...this.state, password});
	}

	render() {
		const {username, password} = this.state;
		return(
			<View>
				<TextInput placeholder='username' onChangeText={this._setUsername}/>
				<TextInput placeholder='password' onChangeText={this._setPassword}/>
				<Button title='Login' onPress={() => {
					login(username, password);
				}}/>
			</View>
		);
	}
}