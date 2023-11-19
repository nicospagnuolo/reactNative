import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class Coment extends Component {
    constructor(props){
        super(props)
        this.state = {
          usuario: []
        }
    }


  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity onPress={()=> this.goProfile()}><Text style={styles.txt}><Image
            source={{uri: this.props.data.imgProfile}}
            style = {styles.img}
            resizeMode = 'contain'
            /><Text style={styles.txt2}> {this.props.data.owner}</Text> :  {this.props.data.coment}</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: 'row',
    backgroundColor: "black",
    margin: 10,
    padding: 20,
    borderRadius: 30,
    textAlign: "center",

  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  txt: {
      color: 'white'
  },
  txt2: {
      color: 'white',
      fontWeight: 'bold',
  }
})