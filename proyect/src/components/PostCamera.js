import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { storage } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default class PostCamera extends Component {
    constructor(props){
        super(props)
        this.state={
            showCamera: true,
            permissions: false,
            urlTemp: '',
        }
        this.cameraMethods = null
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=> this.setState({permissions: true}))
        .catch((err) => console.log(err))
    }

    takePicture(){
        this.cameraMethods.takePictureAsync()
        .then((tempImg)=> this.setState({
            urlTemp: tempImg.uri,
            showCamera: false
        }))
        .catch((err)=> console.log(err))
    }

    deletePhoto(){
        this.setState({
            showCamera: true,
            urlTemp: ''
        })
    }

    acceptPhoto(){
        fetch(this.state.urlTemp)
        .then((resp) => resp.blob())
        .then(img =>{
            const ref = storage.ref(`pictures/${Date.now()}.jpg`)
            ref.put(img)
            .then((resp)=> {
                ref.getDownloadURL()
                .then((url)=> this.props.updateImgUrl(url))
            })
            .catch((err)=> console.log(err))
        })
        .catch((err)=> console.log(err))
    }

  render() {
    return (
      <View style= {styles.container} >
        {
            this.state.showCamera && this.state.permissions ?
            <>
            <Camera
                style = {styles.camera}
                type = {Camera.Constants.Type.back}
                ref = {(cameraMethods)=> this.cameraMethods = cameraMethods}
            />
            <TouchableOpacity onPress={()=> this.takePicture()}>
                <FontAwesome name="camera" size={24} color="black" />
            </TouchableOpacity>
            </>
            : this.state.permissions && this.state.showCamera === false ?
                <>
                <Image
                    source={{uri: this.state.urlTemp}} 
                    style = {styles.img}
                    resizeMode = {'contain'}
                />
                {
                    this.props.saveImg ?
                    <TouchableOpacity 
                onPress={()=> this.props.saveImg(this.state.urlTemp)}>
                    <Entypo name="arrow-bold-right" size={24} color="black" />
                </TouchableOpacity>
                    :
                    <TouchableOpacity 
                onPress={()=> this.acceptPhoto()} >
                    <Entypo name="arrow-bold-right" size={24} color="black" />
                </TouchableOpacity>
                }
                
                
                <TouchableOpacity onPress={()=> this.deletePhoto()}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
                </>
            :
            <Text>No tienes permisos</Text>


        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        height: 300
    },
    img: {
        height: 300
    }
})