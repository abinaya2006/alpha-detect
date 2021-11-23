import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PickImage from './screens/camera';

export default class App extends Component{
  render(){
    return(
      <View>
        <PickImage/>
      </View>
    )
  }
}
