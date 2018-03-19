import React, { Component } from 'react'
import { login } from './LoginService'
import styled from 'styled-components'
import { AsyncStorage } from 'react-native'

const View = styled.View`
    position: relative
    top: 50%
    transform: translate(0, -100px)
    padding: 0 15%
`
const Text = styled.Text``
const TextInput = styled.TextInput``
const Button = styled.Button``

export default class LoginScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			token: null,
			apiUrl: ''
		}
	}

	componentWillMount() {
		AsyncStorage.getItem('@studentStorage:apiUrl')
		.then(response => {
			this.setState({apiUrl: response})
			if(this.state.token)
				logout(this.state.apiUrl, this.state.token)
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})

	}

	_setUsername = (username) => {
		this.setState({...this.state, username})
	}

	_setPassword = (password) => {
		this.setState({...this.state, password})
	}

	_setAPIURL = (apiUrl) => {
		this.setState({...this.state, apiUrl})
	}

	render() {
		const {username, password, apiUrl} = this.state
		return(
			<View>
				<TextInput placeholder='username' onChangeText={this._setUsername}/>
				<TextInput secureTextEntry placeholder = 'password'onChangeText={ this._setPassword }/>
                <TextInput placeholder = 'API URL'onChangeText={ this._setAPIURL } value={this.state.apiUrl}/>
                <Button title='Login' onPress={() => {
					login(username, password, apiUrl, this.props.navigation)
				}}/>
			</View>
		)
	}
}