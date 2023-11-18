import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state={
            loadImg: ''
        }
    }

    activatePicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imagenData => this.setState({loadImg: imagenData.assets[0].uri}))
        .catch(err => console.log(err))
    }
    rechazarImagen(){
      this.setState({
        loadImg: ''
      })
  }

  acceptImg(){
      fetch(this.state.loadImg)
      .then(resp => resp.blob())
      .then(image => {
          let ref = storage.ref(`imgProfile/${Date.now()}.jpeg`)
          ref.put(image)
          .then(() => {
              ref.getDownloadURL()
              .then(url => this.props.uploadStateProfileImg(url))
          })
      })
      .catch(err => console.log(err))
  }

  acceptImg2(){
    fetch(this.state.loadImg)
    .then(resp => resp.blob())
    .then(image => {
        let ref = storage.ref(`imgPost/${Date.now()}.jpeg`)
        ref.put(image)
        .then(() => {
            ref.getDownloadURL()
            .then(url => this.props.uploadStatePostImg(url))
        })
    })
    .catch(err => console.log(err))
}


  render() {
    return (
      <View>
        <Text>Profile picture</Text>
        {
            this.state.loadImg !== '' ? 
            <>
                <Image 
                    source = {{
                        uri: this.state.loadImg
                    }}
                    style={styles.img}
                />
                {
                  this.props.post ?
                  <TouchableOpacity style={styles.btn} onPress={() => this.acceptImg2()}>
                    <Text>
                        Accept picture
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.btn} onPress={() => this.acceptImg()}>
                    <Text>
                        Accept picture
                    </Text>
                </TouchableOpacity>

                }
                
                
                <TouchableOpacity style={styles.btn2} onPress={() => this.rechazarImagen()}>
                    <Text>
                        Denie picture
                    </Text>
                </TouchableOpacity>
            </>
            :
            <>
              <View>
                <TouchableOpacity style={styles.btn} onPress={()=> this.activatePicker()}>
                  <Text>View my libary</Text>
                </TouchableOpacity>
      </View>
            </>
        }
      </View>
    )
      
    
  }
  
}

const styles = StyleSheet.create({
  
  img: {
    height: 200
  },
  btn:{
      backgroundColor: '#808000',
      padding: 10,
      border: 'none',
      borderRadius: 4,
      width: 110
  },
  btn2:{
      backgroundColor: '#778899',
      padding: 10,
      border: 'none',
      borderRadius: 4,
      width: 120
  }
})