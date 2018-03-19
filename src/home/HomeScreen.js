import React, { Component } from 'react'
import styled from 'styled-components';
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
});

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``
const Button = styled.Button``
const position = {
    latitude: 15.5041700,
    longitude: -88.025000,
}

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 15.5041700,
                longitude: -88.025000,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        }
    }

    componentDidMount() {
        this.map.fitToElements(true);
        this.map.animateToRegion(this.state.region);
    }

    render() {
        return (
          <View style ={styles.container}>
            <MapView ref={map => {this.map = map}}
              style={styles.map}
              initialRegion={this.state.region}
              onRegionChangeComplete={(region) => {
                this.setState({region});
                this.map.fitToElements(true);
              }} showUserLocation={true}>
              <Marker coordinate={position} title="Bus Unitec" desciption="Eureka"/>
            </MapView>
          </View>
        );
    }
}
