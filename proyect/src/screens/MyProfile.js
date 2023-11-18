import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet, ScrollView, ImageBackground} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'
import { SimpleLineIcons } from '@expo/vector-icons'; 


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
        usuario : arrUsuario[0].data,
        id: arrUsuario[0].id
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



  render() {
    return (
      <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
        
                <ScrollView >
                <View style={styles.container}>
                  <View style={styles.card}>
                <Image
                  source={{uri: this.state.usuario.imgProfile ? this.state.usuario.imgProfile : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
                  style = {styles.img}
                  resizeMode = 'contain'
                />
                <Text style={styles.txt}>Welcome to your profile: {this.state.usuario.name}</Text>
                <Text style={styles.txt}>Your email: {this.state.usuario.owner}</Text>
                <TouchableOpacity style={styles.signoutBtn} onPress={()=> this.logout()}>
                  <Text ><SimpleLineIcons name="logout" size={24} color="black" /> Log out</Text>
                </TouchableOpacity>
                </View>
                <Text>Your posts</Text>
                {
                  this.state.posts.length === 0 ?
                  <Text style={styles.text}>You don't have posts yet.</Text>
                  :
                  <></>
                }
                <View style={styles.container}>
                <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} data={item} id={item.id} profile = {true}/>
                                
                            </View>
                        }
                />
                </View>
                </View>
                </ScrollView>
                
                </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
    signoutBtn:{
      backgroundColor: '#808000',
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
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'wrap',
    flexDirection: 'wrap'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  txt: {
      color: 'white'
  },
  card: {
    alignSelf: "baseline",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        width: 300,
        textAlign: "center",
  }
  })