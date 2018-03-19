import React, { Component } from 'react'
import styled from 'styled-components'
import { View, Picker } from 'react-native'
import { populateRoutes } from './SelectRouteService'
import { AsyncStorage } from 'react-native'
import Toaster from '../helpers/FetchToast'

const Text = styled.Text`
    fontFamily: 'Cochin';
    fontSize: 20;
`
const StyledButton = styled.Button`
    margin: 16px;
    width: 300;
    color=#841584;
`

export default class SelectRouteScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedRoute: '1',
            btnMsg: 'Localizar',
            routes: [],
            rideID: '',
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
                populateRoutes(apiUrl, token)
                .then(response => {
                    const _routes = response.data.map(item => { return { name: item.name, id: item.id } });
                    this.setState({routes: _routes, selectedRoute: _routes[0]});
                })
                .catch((error) => {
                    console.log(error);
                    Toaster('Error!', `Error al solicitar rutas: ${error.message}`, () => {
                        populateRoutes(apiUrl, token)
                    })
                })
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    generateRoutes = () =>  this.state.routes.map(item => <Picker.Item label={item.name} value={item.id} key={item.id} />)

    getRoute = (id) => this.state.routes.map(item => {
        if (item.id === id)
            this.setState({ selectedRoute: item});
    })

    startAction = () => {
        AsyncStorage.setItem('@studentStorage:route', JSON.stringify(this.state.selectedRoute))
        .then(response => {
            this.props.navigation.navigate('MapView')
        })
        .catch(error => {
            Toaster('Error', `Problema al intentar localizar ruta: ${error.message}`,
            () => {
                startAction()
            })
        })
    }

    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Select Route</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Picker
                    style={{width: 200}} 
                    selectedValue={this.state.selectedRoute.id}
                    onValueChange={this.getRoute}>
                    { this.generateRoutes() }
                </Picker>
                <StyledButton title = {this.state.btnMsg} onPress = { () => { this.startAction() }}/>
            </View>
        )
    }
}