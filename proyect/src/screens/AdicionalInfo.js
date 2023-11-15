import { Text, View } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'

export default class AdicionalInfo extends Component {

  render() {
    return (
      <View>
        <Text>AdicionalInfo</Text>
        <MyImagePicker/>
      </View>
    )
  }
}