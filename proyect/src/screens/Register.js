import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import {View, StyleSheet, ImageBackground} from 'react-native'

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
      <ImageBackground source={require('../../assets/fondoLogin.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
            <FormRegister navigation={this.props.navigation} img = {this.state.urlImg} />
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
  },
  backgroundImage2: {
    flex: 1,
    justifyContent: 'center',
    height: 30
  }
})