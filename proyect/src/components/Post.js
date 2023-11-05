import { Text, View, TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            likes: 0,
            myLike: false
        }
    }
    
    like(){
        db
        .collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                estaMiLike:true
            })
        })
        .catch((err) => console.log(err))
    }

  render() {
    return (
      <View>
        <Text>Soy el posteo de: {this.props.data.owner}</Text>
        <Text>description: {this.props.data.description}</Text>
        {
            this.state.myLike === false ?
            <TouchableOpacity onPress={() => this.like()} >
                <FontAwesome
                    name='heart-o'
                    color='red' 
                    size={24}/>
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <FontAwesome
                name='heart'
                color='red' 
                size={24}/>
            </TouchableOpacity>
        }
      </View>
    )
  }
}