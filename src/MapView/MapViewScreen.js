import React, { Component } from 'react'
import styled from 'styled-components';
import { AsyncStorage } from 'react-native';

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``

export default class MapViewScreen extends Component {
    componentWillMount() {
        AsyncStorage.getItem('@studentStorage:route')
        .then(response => {
            console.log('map view route: ', response)
        })
        .catch(error => {
            
        })
    }

    render() {
        return (
            <View>
                <Text> { 'Map View Screen' } </Text>
            </View>
        )
    }
}