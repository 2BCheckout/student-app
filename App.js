/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import StackNavigator from './src/home/HomeScreen';
import styled from 'styled-components';
const View = styled.View`
    background: #fff;
`;
const Text = styled.Text``
const Button = styled.Button``

export default class App extends Component {
  render() {
    return (
        <StackNavigator/>
    );
  }
}
