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
        <FormLogin navigation={this.props.navigation}/>
        <Text>
          You don't have an account yet?
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('register')}>
            Register here!
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