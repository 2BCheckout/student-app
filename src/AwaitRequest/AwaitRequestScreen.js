import React, { Component } from 'react'
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``
const Button = styled.Button``

export default class AwaitRequestScreen extends Component {

    render() {
        return (
            <View>
                <Text> { 'AwaitRequestScreen' } </Text>
                <Button
			        onPress={() => this.props.navigation.goBack()}
			        title="Go back home"
			      />
            </View>
        )
    }
}