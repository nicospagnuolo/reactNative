import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db} from '../firebase/config'
import User from '../components/User'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchData: [],
      valorInput: '',
      search: true
    }
  }
  filterUsers(input){
    db.collection('users').where("name", "==", input).onSnapshot((docs)=>{
      let arrUsuarios = []
      docs.forEach(doc =>{
        arrUsuarios.push({
            id: doc.id,
            data: doc.data()
        })
    })
      this.setState({
        searchData: arrUsuarios,
        search: false
    }, ()=> console.log(this.state.searchData))
    })
  }

  
  render() {
    return (
          this.state.search ?
          <>
          <Text>FormSearch</Text>
          <TextInput
              style = {styles.input}
              placeholder = 'Search with username'
              keyboardType = 'default'
              value = {this.state.valorInput}
              onChangeText = { (text) => this.setState({valorInput: text}) }
          />
          <TouchableOpacity onPress={() => this.filterUsers(this.state.valorInput)} style={styles.btn}>
              <Text>Search users</Text>
          </TouchableOpacity>
          </>
          :
          <>
                <FlatList
                    data={this.state.searchData}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <User data={item} id={item.id} />}
                />
                </>
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
      color:'white'
  }
})