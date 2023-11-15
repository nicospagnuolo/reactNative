import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'


export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      urlImg: '',
      step1: true, 
      userId: ''
    }
  }



  



  render() {
    return (
      <View style={styles.container}>
          <>
            <FormRegister navigation={this.props.navigation} img = {this.state.urlImg} />
        </>
          
          
        
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