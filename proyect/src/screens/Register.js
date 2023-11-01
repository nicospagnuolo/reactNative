import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Register extends Component {
  constructor(props){
    super(props)
  }


  render() {
    return (
      <View style={styles.container}>
        <FormRegister navigation={this.props.navigation}/>
        <Text>
          Already have an account?
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('login')}>
            Login here!
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:'center'
  }
})