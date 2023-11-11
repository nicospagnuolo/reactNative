import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Coment extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View>
        <Text>Profile: {this.props.data.owner}</Text>
        <Text>Comment: {this.props.data.coment}</Text>
      </View>
    )
  }
}