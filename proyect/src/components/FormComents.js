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
    .then()
    .catch((e) => console.log(e))
}

  render() {
    return (
      <View>
        <Text>Add your coment</Text>
         <TextInput
                    style = {styles.input}
                    placeholder = 'coment'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({coment: text}) }
                />
                {
                  this.state.coment !== '' ?
                  <TouchableOpacity 
                  style={styles.btn}
                  onPress={(obj)=> this.addComent(this.state.coment)}
                    >
                  <Text 
                  style={styles.textBtn}>
                    Add comment
                  </Text>
                </TouchableOpacity>
                :
                <Text style={styles.text}>You have to write more than 0 character.</Text>
                }
                
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
    backgroundColor: '#87ceeb',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 4,
    width: 150
  },
  text:{
    color:'red'
}
})