import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'
import PostCamera from '../components/PostCamera'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      urlImg: '',
      step1: true, 
      userId: ''
    }
  }

  componentDidUpdate(){
    if (this.state.urlImg !== '') {
      this.saveImg()
    }
  }

  updateImgUrl(url){
    this.setState({
      urlImg: url,
      step1: false
    })
  }



  saveImg(){
    db
    .collection('users')
    .doc(this.state.userId)
    .update({
        imgProfile: this.state.urlImg
    })
    .then((resp) =>{
      this.setState({
        urlImg: '',
        step1: true
      }, ()=> this.props.navigation.navigate('tabNavigation'))
      
    })
    .catch((err) => console.log(err))
}

  actualizarPaso(id){
    this.setState({
      step1: false,
      userId: id
    })
  }



  render() {
    return (
      <View style={styles.container}>
        {
          this.state.step1 ?
          <>
            <FormRegister  actualizarPaso= {(id)=> this.actualizarPaso(id)} navigation={this.props.navigation} img = {this.state.urlImg} />
        </>
          
          :
          <PostCamera  updateImgUrl= {(url)=> this.actualizarPaso(url)} />
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