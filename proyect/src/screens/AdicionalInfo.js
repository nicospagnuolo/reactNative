import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'

export default class InfoAdicionalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fotoDePerfil: ''
        }
    }

    uploadStateProfileImg(url) {
        this.setState({
            fotoDePerfil: url
        })
    }

    uploadStateDocUser(){
        console.log(this.props.route.params.docId)
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
          imgProfile: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('Home')
            console.log()
        })
    }

    omit(){
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
          imgProfile: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
        })
        .then(resp => {
            this.props.navigation.navigate('login')
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <View>
                <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
                <MyImagePicker uploadStateProfileImg={(url) => this.uploadStateProfileImg(url)} />
                {
                    this.state.fotoDePerfil !== '' ?
                        <TouchableOpacity style={styles.btn} onPress={() => this.uploadStateDocUser()}>
                            <Text>
                                Add profile picture
                            </Text>
                        </TouchableOpacity>
                        :null
                }
                <TouchableOpacity style={styles.btn2} onPress={() => this.omit()}>
                    <Text>
                        Omit step
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  
  btn:{
      backgroundColor: '#808000',
      padding: 10,
      border: 'none',
      borderRadius: 4,
      width: 130
  },
  btn2:{
      backgroundColor: '#778899',
      padding: 10,
      border: 'none',
      borderRadius: 4,
      width: 140
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  }
})