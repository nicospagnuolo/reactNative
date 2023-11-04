import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { auth } from '../firebase/config'

export default class NewPost extends Component {
  render() {
    return (
      <View>
        <FormPost />
      </View>
    )
  }
}