import React, { Component } from 'react'
import styled from 'styled-components'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import Toaster from '../helpers/FetchToast'
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  map: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
})

const View = styled.View`
    margin: 20% 10%
`
const Text = styled.Text``
const Button = styled.Button``

export default class MapViewScreen extends Component {
    _minutes = 1
    // _position = {
    //     latitude: 0,
    //     longitude: 0
    // }
    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: 15.5041700,
                longitude: -88.025000,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            fetchingLocation: false,
            apiUrl: '',
            token: '',
            route: {
                name: '',
                desciption: ''
            },
            position: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentWillMount() {
        AsyncStorage.multiGet(['@studentStorage:apiUrl', '@studentStorage:token', '@studentStorage:route'])
        .then(response => {
            console.log('map view stored: ', response)
            const [[aKey, apiUrl], [tKey, token], [rKey, route]] = response
            this.setState({apiUrl, token}, () => {
                axios.get(`${apiUrl}/routes/${JSON.parse(route).id}`)
                .then(content => {
                    console.log('content route: ', content)
                    this.setState({route: content.data}, () => {
                        this.getLocation()
                    })
                })
                .catch(error => {

                })
            })
        })
        .catch(error => {
            
        })
    }

    componentDidMount() {
        this.map.fitToElements(true)
        this.map.animateToRegion(this.state.region)
    }

    minutesInMillis = (minutes) => {
        const minuteInMillis = 60 * 1000
        return minutes * minuteInMillis
    }

    fetchLocation = () => {
        const { apiUrl, token, route } = this.state
        this.setState({fetchingLocation: true})
        axios.get(`${apiUrl}/rides/findOne?filter={"where": {"and":[{"routeId":${route.id}},{"isActive":true}]}}`)
        .then(response => {
            console.log('get active ride: ', response)
            if (response.status === 200) {
                this.setState({
                    position: {
                        latitude: response.data.latitude,
                        longitude: response.data.longitude
                    }
                })
            }
        })
        .catch(error => {
            console.log('error getting active ride: ', error)
            Toaster('Error', `No se encontro viaje activo: ${error.message}`,
            () => {
                this.fetchLocation()
            })
        })
    }

    getLocation = () => {
        // KeepAwake.activate()
        this.fetchLocation()
        setInterval(this.fetchLocation, this.minutesInMillis(this._minutes))
    }

    isPosition = () => this._position.latitude !== null && this._position.longitude !== null

    render() {
        const { position, route } = this.state
        return (
          <View style ={styles.container}>    
            <MapView ref={map => {this.map = map}}
              style={styles.map}
              initialRegion={this.state.region}
              onRegionChangeComplete={(region) => {
                this.setState({region})
                this.map.fitToElements(true)
              }} showUserLocation={true}>
                <Marker coordinate={position} title={route.name} desciption={route.description}/>
            </MapView>
          </View>
        )
    }
}