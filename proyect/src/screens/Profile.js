import { Text, View, ActivityIndicator, FlatList, TouchableOpacity,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
        posts:[],
        hayDatos: false
    }
  }
  componentDidMount(){
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
                <Text>Welcome to your profile {auth.currentUser.email}</Text>
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
    }
  })