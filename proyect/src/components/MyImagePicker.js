import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state={
            loadImg: 'ee'
        }
    }

    activatePicker(){
        ImagePicker.launchImageLibraryAsync()
        .then()
        .catch()
    }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=> this.activatePicker()}>
          <Text>press</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
}