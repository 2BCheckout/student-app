import React, { Component } from 'react'
import { login, logout } from './LoginService'
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
	_urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			token: null,
			apiUrl: '',
			error: ''
		}
	}

	componentWillMount() {
		AsyncStorage.multiGet(['@studentStorage:apiUrl','@studentStorage:token'])
		.then(response => {
			const [[aKey, apiUrl], [tKey, token]] = response
			console.log(apiUrl)
			console.log(token)
			if (apiUrl)
				this.setState({apiUrl})
			if(token){
				logout(this.state.apiUrl, token, this.props.navigation)
			}
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

	_validateInputs = () => {
        this.setState({error: ''})
        const { username, password, apiUrl} = this.state
        if (!(username.length>0 && password.length>0)) {
            this.setState({error: 'User or Password incorrect'})
            return
        }
        if (!this._urlRegex.test(apiUrl)) {
            this.setState({error: 'API URL is an invalid link'})
            return
        }
        login(username, password, apiUrl, this.props.navigation)
    }

	render() {
		const {username, password, apiUrl} = this.state
		return(
			<View>
				<TextInput placeholder='username' onChangeText={this._setUsername}/>
				<TextInput secureTextEntry placeholder = 'password'onChangeText={ this._setPassword }/>
                <TextInput placeholder = 'API URL'onChangeText={ this._setAPIURL } value={this.state.apiUrl}/>
                <Button title='Login' onPress={this._validateInputs}/>
				{ (this.state.error.length > 0) && <Text>{this.state.error}</Text>}
			</View>
		)
	}
}