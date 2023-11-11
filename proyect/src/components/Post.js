import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
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

    componentDidMount(){
        console.log(this.props)
        this.setState({
            likes: this.props.data.data.likes.length
        })
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
                myLike:true,
                likes: this.state.likes + 1
            })
        })
        .catch((err) => console.log(err))
    }

    unLike(){
        db
        .collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                myLike:false,
                likes: this.state.likes - 1
            })
        })
        .catch((err) => console.log(err))
    }

    

    irComentar(){
        this.props.navigation.navigate('coments', {post: this.props.id})
    }

  render() {
    return (
      <View style = {styles.card}>
        <Text >Soy el posteo de: {this.props.data.data.owner}</Text>
        <Image
            source={{uri: this.props.data.data.img ? this.props.data.data.img : ''}}
            style = {styles.img}
            resizeMode = 'contain'

        />
        <Text >{this.props.data.data.owner}: {this.props.data.data.description}</Text>
        {
            this.state.myLike === false ?
            <TouchableOpacity onPress={() => this.like()} >
                <FontAwesome
                    name='heart-o'
                    color='red' 
                    size={24}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.unLike()}>
                <FontAwesome
                name='heart'
                color='red' 
                size={24}/>
            </TouchableOpacity>
        }
        <Text >{this.state.likes}  likes</Text>
        <TouchableOpacity style={styles.btn} onPress={()=> this.irComentar()}>
            <Text >View coments</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 200
    },
    card: {
        alignSelf: "baseline",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 400,
        margin: 10,
        padding: 20,
        borderRadius: 30,
        width: 500,
        textAlign: "center",
    },
    btn: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: 10,
        border: 'none',
        borderRadius: 4
    }
})