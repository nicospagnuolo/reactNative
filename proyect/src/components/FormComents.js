import { Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class FormComents extends Component {
  constructor(props){
    super(props)
    this.state = {
      coment: '',

    }
  }
  addComent(coment){
    db
    .collection('posts')
    .doc(this.props.post)
    .update({
        coments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            coment: coment
        })
    })
    .then(()=> this.props.navigation.navigate('Home'))
    .catch((e) => console.log(e))
}

  render() {
    return (
      <View>
        <Text>Coments</Text>
         <TextInput
                    style = {styles.input}
                    placeholder = 'coment'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({coment: text}) }
                />
                <TouchableOpacity 
                  style={styles.btn}
                  onPress={(obj)=> this.addComent(this.state.coment)}
                    >
                  <Text 
                  style={styles.textBtn}>
                    Add coment
                  </Text>
                </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
      borderWidth: 1,
      borderColor: 'green',
      marginBottom: 24
  },
  btn:{
      backgroundColor:'purple',
      padding:16
  },
  textBtn:{
      color:'white'
  }
})