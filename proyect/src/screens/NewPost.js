import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { auth, db } from '../firebase/config'

export default class NewPost extends Component {

  onSubmit({
    description
  }){
    db.collection('posts').add({
        owner: auth.currentUser.email,
        description: description,
        // img: this.state.img,
        createdAt: Date.now(),
        likes: []
    })
    .catch((e) => console.log(e))
}
  render() {
    return (
      <View>
        <FormPost onSubmit={(obj)=> this.onSubmit(obj)} />
      </View>
    )
  }
}