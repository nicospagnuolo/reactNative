import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            valorInput: ''
        }
    }
  render() {
    return (
      <View>
        <Text>FormSearch</Text>
        <TextInput
            style = {styles.input}
            placeholder = 'Search with username'
            keyboardType = 'default'
            value = {this.state.valorInput}
            onChangeText = { (text) => this.setState({valorInput: text}) }
        />
        <TouchableOpacity>
            <Text>Search users</Text>
        </TouchableOpacity>
      </View>
    )
  }
}