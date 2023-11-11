import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class Coment extends Component {
    constructor(props){
        super(props)
        this.state = {
          usuario: []
        }
    }


  
    componentDidMount(){
      db.collection('users').where("owner", "==", this.props.data.owner).onSnapshot((docs)=>{
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
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text><Image
            source={{uri: this.state.usuario.img ? this.state.usuario.img : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
            style = {styles.img}
            resizeMode = 'contain'
            />{this.props.data.owner}: {this.props.data.coment} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "baseline",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 30,
    width: 500,
    textAlign: "center",

  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
})