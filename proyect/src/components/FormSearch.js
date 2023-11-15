import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class FormSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            valorInput: ''
        }
    }

    guardarValor(evento){
       this.props.filterMovies(evento)
       this.props.uploadInput(evento)
      
    }

    
  render() {
    return (
      <View>
        <Text>FormSearch</Text>
        <TextInput
            style = {styles.input}
            placeholder = 'Search with username'
            keyboardType = 'default'
            onChangeText = {(evento)=> this.guardarValor(evento)}
        />
        <TouchableOpacity style={styles.btn}>
            <Text>Search users</Text>
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
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 4,
    width: 150
  },
  textBtn:{
      color:'red'
  }
})