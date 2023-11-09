import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'

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
          arrPosts.length > 0 ?
              this.setState({
                  hayDatos: true,
                  posts: arrPosts
              },()=> console.log(this.state.posts))
              :
              this.setState({
                  hayDatos: false,
              })
      })
      
  }

    logout(){
        auth.signOut()
        this.props.navigation.navigate('login')
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
                <View>
                <Image
                  source={{uri: this.state.usuario.imgProfile}}
                  style = {styles.img}
                  resizeMode = 'contain'
                />
                <Text>Welcome to your profile: {this.state.usuario.name}</Text>
                <Text>Your email: {this.state.usuario.owner}</Text>
                <TouchableOpacity style={styles.signoutBtn} onPress={()=> this.logout()}>
                  <Text>Sign out</Text>
                </TouchableOpacity>
                <Text>Your posts</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <Post data={item} />}
                />
                
                </View>
                </>
      
    )
  }
}

const styles = StyleSheet.create({
    signoutBtn:{
      backgroundColor:'red',
      padding: 16
    },
    img: {
      width: 100,
      height: 100,
      borderRadius: '50%'
  }
  })