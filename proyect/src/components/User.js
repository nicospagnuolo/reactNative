import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class User extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View>
        <Text>Soy el usuario de: {this.props.data.data.owner}</Text>
        <Text>username: {this.props.data.data.name}</Text>
      </View>
    )
  }
}