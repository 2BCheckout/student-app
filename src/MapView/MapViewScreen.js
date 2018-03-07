import React, { Component } from 'react'
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``

export default class MapViewScreen extends Component {

    render() {
        return (
            <View>
                <Text> { 'Map View Screen' } </Text>
            </View>
        )
    }
}