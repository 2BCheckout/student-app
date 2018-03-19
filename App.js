/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import styled from 'styled-components';
import { AsyncStorage } from 'react-native';

const View = styled.View`
    background: #fff;
`;
const Text = styled.Text``
const Button = styled.Button``

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerLockMode: 'locked-closed'
    }
  }

  setDrawerActive = () => {
    this.setState({drawerLockMode: 'unlocked'})
  }

  setDrawerInactive = () => {
    this.setState({drawerLockMode: 'locked-closed'})
  }

  render() {
    return (
        <StackNavigator screenProps={{drawerLockMode: this.state.drawerLockMode, setDrawerActive: this.setDrawerActive, setDrawerInactive: this.setDrawerInactive}}/>
    );
  }
}
