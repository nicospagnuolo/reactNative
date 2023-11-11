import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet, ScrollView} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
        posts:[],
        hayDatos: false,
        usuario:[]
    }
  }
  componentDidMount(){
    db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
      let arrUsuario = []
      docs.forEach((doc) => {
        arrUsuario.push({
          id:doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuario : arrUsuario[0].data 
      }, () => console.log(this.state.usuario))

    })
      db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs =>{
          let arrPosts = []
          docs.forEach(doc =>{
              arrPosts.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
              this.setState({
                  hayDatos: true,
                  posts: arrPosts
              },()=> console.log(this.state.posts))
              
      })
      
  }

    logout(){
        auth.signOut()
        this.props.navigation.navigate('login')
    }

    deletePost(postId){
        db.collection('posts')
        .doc(postId)
        .delete()
    }

  render() {
    return (
        this.state.hayDatos === false ?
          <ActivityIndicator
                    size={32}
                    color={'blue'}
                />
                :
                <>
                <ScrollView>
                <Image
                  source={{uri: this.state.usuario.imgProfile}}
                  style = {styles.img}
                  resizeMode = 'contain'
                />
                <Text>Welcome to your profile: {this.state.usuario.name}</Text>
                <Text>Your email: {this.state.usuario.owner}</Text>
                <TouchableOpacity style={styles.signoutBtn} onPress={()=> this.logout()}>
                  <Text><SimpleLineIcons name="logout" size={24} color="black" /> Log out</Text>
                </TouchableOpacity>
                <Text>Your posts</Text>
                {
                  this.state.posts.length === 0 ?
                  <Text style={styles.text}>You don't have posts yet.</Text>
                  :
                  <></>
                }
                <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} data={item} id={item.id} />
                                <TouchableOpacity onPress={() => this.deletePost(item.id)} style= {styles.btn}>
                                    <Text><EvilIcons name="trash" size={24} color="black" />Delete post</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />              
                </ScrollView>
                </>
      
    )
  }
}

const styles = StyleSheet.create({
    signoutBtn:{
      backgroundColor: '#4caf50',
        color: '#fff',
        padding: 10,
        border: 'none',
        borderRadius: 4,
        width: 100
    },
    img: {
      width: 100,
      height: 100,
      borderRadius: '50%'
  },
  btn:{
    backgroundColor: '#87ceeb',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 4,
    width: 150
  },
  text: {
      color: 'red'
  }   
  })