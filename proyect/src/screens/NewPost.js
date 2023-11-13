import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { auth, db } from '../firebase/config'
import PostCamera from '../components/PostCamera'

export default class NewPost extends Component {
  constructor(props){
    super(props)
    this.state={
      description:'',
      urlImg: '',
      step1: true
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
    .then(()=> this.props.navigation.navigate('Home'))
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
        {
          this.state.step1 ?
          <PostCamera updateImgUrl= {(url)=> this.updateImgUrl(url)} />

          :
          <>
            <FormPost 
            updateDescription = {(description)=> this.updateDescription(description)}
            stateDescription = {this.state.description}
          />

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
          <Text style= {styles.text}>Fill all the sections </Text>
        }
          </>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  btn2:{
    backgroundColor: '#87ceeb',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 4
}, 
container: {
  flex: 1,
  justifyContent:'center'
},
text: {
  color: 'red'
}
})
