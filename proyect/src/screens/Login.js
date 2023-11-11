import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Login extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    auth.onAuthStateChanged((user)=> {
      if (user !== null) {
        this.props.navigation.navigate('tabNavigation')
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Login to your account</Text>
        <FormLogin navigation={this.props.navigation}/>
        
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