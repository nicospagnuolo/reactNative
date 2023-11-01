import { Text, View, TouchableOpacity,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class Profile extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(auth.currentUser)
    }
    logout(){
        auth.signOut()
        this.props.navigation.navigate('login')
    }

  render() {
    return (
      <View>
        <Text>The user email is: {auth.currentUser.email}</Text>

        <View>
            <TouchableOpacity style={styles.signoutBtn} onPress={()=> this.logout()}>
            <Text>Sign out</Text>
            </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    signoutBtn:{
      backgroundColor:'red',
      padding: 16
    }
  })