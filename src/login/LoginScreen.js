import React, { Component } from 'react';
import { login } from './LoginService';
import styled from 'styled-components';

const View = styled.View`
    position: relative;
    top: 50%;
    transform: translate(0, -100px);
    padding: 0 15%;
`;
const Text = styled.Text``
const TextInput = styled.TextInput``
const Button = styled.Button``

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
					login(username, password, this.props.navigation);
				}}/>
			</View>
		);
	}
}