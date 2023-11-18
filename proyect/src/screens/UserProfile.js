import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet, ScrollView, ImageBackground} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'
import { SimpleLineIcons } from '@expo/vector-icons'; 


export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            posts: []
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', this.props.route.params.usuario).onSnapshot((docs)=> {
            let arrUser = []       
            docs.forEach((doc)=> {
                arrUser.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                users: arrUser[0].data
            }, ()=> console.log(this.state.users))
        })

        db.collection('posts').where('owner', '==', this.props.route.params.usuario).onSnapshot((docs)=> {
            let arrPost = []
            docs.forEach((doc)=> {
                arrPost.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: arrPost
            }, ()=> console.log(this.state.posts))
        })
    }


  render() {
    return (
        <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
      <ScrollView >
                <Image
                  source={{uri: this.state.users.imgProfile ? this.state.users.imgProfile : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
                  style = {styles.img}
                  resizeMode = 'contain'
                />
                <Text style={styles.txt}>Welcome to your profile: {this.state.users.name}</Text>
                <Text style={styles.txt}>Your email: {this.state.users.owner}</Text>
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
                                <Post navigation={this.props.navigation} data={item} id={item.id} />
                                
                            </View>
                        }
                />
                </View>
                </ScrollView>
      </ImageBackground>
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
  }
  })