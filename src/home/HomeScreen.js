import React, { Component } from 'react'
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``
const Button = styled.Button``

export default class HomeScreen extends Component {

    render() {
        return (
            <View>
                <Text> { 'HOME' } </Text>
                <Button
			        onPress={() => this.props.navigation.navigate('AwaitRequest')}
			        title="Go to await request"
			      />
            </View>
        )
    }
}