import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { auth, db } from '../firebase/config'
import PostCamera from '../components/PostCamera'
import MyImagePicker from '../components/MyImagePicker'

export default class NewPost extends Component {
  constructor(props){
    super(props)
    this.state={
      description:'',
      urlImg: '',
      step1: true,
      clickCamera: false
    }
  }

  onSubmit({
    description,
    photoUrl
  }){
    db.collection('posts').add({
        owner: auth.currentUser.email,
        description: description,
        img: photoUrl,
        createdAt: Date.now(),
        likes: [],
        coments: []
    })
    .then(()=> {this.props.navigation.navigate('Home'), this.setState({description: '', urlImg: '', step1: true, clickCamera: false, clickLibary: false})})
    .catch((e) => console.log(e))
}
updateDescription(text){
  this.setState({
    description: text
  })
}
updateImgUrl(url){
  this.setState({
    urlImg: url,
    step1: false
  })
}
  render() {
    return (
      <View style = {styles.container}>
        <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
        <TouchableOpacity style= {styles.btn2} onPress= {()=>this.setState({
          clickCamera: true,
          clickLibary: false
        })}>
          <Text >Take picture with camera</Text>
        </TouchableOpacity>
        <></>
        <TouchableOpacity style= {styles.btn2} onPress= {()=> this.setState({
          clickLibary: true,
          clickCamera: false
        })}>
          <Text >Choose from libary</Text>
        </TouchableOpacity>

        {
          this.state.step1 == true && this.state.clickCamera == true ?
          <PostCamera updateImgUrl= {(url)=> this.updateImgUrl(url)} />
          :
          this.state.step1 == true && this.state.clickLibary == true ?
          <MyImagePicker uploadStatePostImg={(url) => this.updateImgUrl(url)} post = {'1'}/>
          :
          <>
          {this.state.step1 == false && (this.state.clickCamera == true || this.state.clickLibary == true) ?
              <FormPost 
              updateDescription = {(description)=> this.updateDescription(description)}
              stateDescription = {this.state.description}
          />
          :
          <></>}
          

          {this.state.description !== '' ?
          <TouchableOpacity 
            style={styles.btn2}
            onPress={(obj)=> this.onSubmit({
              description: this.state.description,
              photoUrl: this.state.urlImg
            })}
              >
            <Text 
            style={styles.textBtn}>
              Add post
            </Text>
          </TouchableOpacity>
          :
          this.step1 == false && this.state.description == '' ?
          <Text style= {styles.text}>Fill all the sections </Text>
          :
          <></>
        }
          </>
        }
        </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  btn2:{
    backgroundColor: '#87ceeb',
    color: '#fff',
    padding: 10,
    margin: 10,
    border: 'none',
    borderRadius: 4,
    width: 250
}, 
container: {
  flex: 1,
  justifyContent:'center'
},
text: {
  color: 'red'
},
backgroundImage: {
  flex: 1,
  resizeMode: 'cover', 
  justifyContent: 'center',
}
})
