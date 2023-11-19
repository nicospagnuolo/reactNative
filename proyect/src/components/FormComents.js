import { Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class FormComents extends Component {
  constructor(props){
    super(props)
    this.state = {
      coment: '',
      usuario: []

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
      })

    })}


  addComent(coment){
    db
    .collection('posts')
    .doc(this.props.post)
    .update({
        coments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            coment: coment,
            imgProfile: this.state.usuario.imgProfile
        })
    })
    .then(()=> this.setState({coment: ''}))
    .catch((e) => console.log(e))
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Add your coment</Text>
         <TextInput
                    style = {styles.input}
                    placeholder = 'coment'
                    keyboardType = 'default'
                    value = {this.state.coment}
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
      color:'white',
      marginBottom: 24
  },
  btn:{
    backgroundColor: '#808000',
    padding: 10,
    border: 'none',
    borderRadius: 4,
    width: 150
  },
  text:{
    color:'red'
  },
  container: {
    width: 350,
    margin: 50, 
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 20
  },
    txt: {
        color: 'white'
    }
})