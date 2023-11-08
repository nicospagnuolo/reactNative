import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'
import PostCamera from '../components/PostCamera'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      urlImg: '',
      step1: true
    }
  }

  updateImgUrl(url){
    this.setState({
      urlImg: url,
      step1: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // this.state.step1 ?
          // <PostCamera updateImgUrl= {(url)=> this.updateImgUrl(url)} />
          // :
          <>
            <FormRegister navigation={this.props.navigation} img = {this.state.urlImg} />
          <Text>
            Already have an account?
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('login')}>
              Login here!
            </TouchableOpacity>
          </Text>
        </>
        }
        
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