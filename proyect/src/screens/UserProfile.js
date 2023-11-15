import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet, ScrollView} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'


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
                users: arrUser
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
      <View>
        <Text>UserProfile</Text>
      </View>
    )
  }
}