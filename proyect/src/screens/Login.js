import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
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
      <ImageBackground source={require('../../assets/fondoLogin.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <FormLogin navigation={this.props.navigation}/>
      </View>
      </ImageBackground> 
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    display: 'flex',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  }
})