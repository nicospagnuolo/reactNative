import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import {db} from '../firebase/config'
import User from '../components/User'
import FormSearch from '../components/FormSearch'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchData: [],
      backUp: [],
      valorInput: '',
      search: true
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(docs =>{
        let arrPosts = []
        docs.forEach(doc =>{
            arrPosts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        this.setState({
          backUp: arrPosts,
        })
    })
  }
  filterUsers(input){
    let users = this.state.backUp.filter((elm) => elm.data.name.toLowerCase().includes(input.toLowerCase())
    || elm.data.owner.toLowerCase().includes(input.toLowerCase()))
    this.setState({
      searchData: users,
      search: false
    })
  }

  uploadInput(valor){
    this.setState({
      valorInput: valor
    })
    console.log(this.state.searchData)
  }

  
  
  render() {
    return (
      <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
          <>
          <FormSearch filterMovies={(name) => this.filterUsers(name)} uploadInput={(valor)=> this.uploadInput(valor)}/>
            <FlatList
                    data={this.state.searchData}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <User data={item} id={item.id} />}
                />            
          </>
          </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  }
})

