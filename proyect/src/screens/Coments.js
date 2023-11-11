import React, { Component } from 'react'
import {View, FlatList, Text, StyleSheet, Image } from 'react-native'
import FormComents from '../components/FormComents'
import { db } from '../firebase/config'
import Coment from '../components/Coment'
export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      coments: [],
      haydatos: false
    }
  }

  componentDidMount() {
    db
    .collection('posts')
    .doc(this.props.route.params.post)
    .onSnapshot((doc) => {
            let arrComents = doc.data().coments
            arrComents.length > 0 ?
              this.setState({
                  hayDatos: true,
                  coments: arrComents
              },()=> console.log(this.state.coments))
              :
              this.setState({
                  hayDatos: false,
              })
    })
}

  

  render() {
    return (
      <View>
          <>
          {
            this.state.coments.length === 0 ?
            <Text style={styles.text}>This post don't have commets yet</Text>
            :
            <></>
          }
            <FlatList
                data={this.state.coments}
                keyExtractor={(item)=> item.createdAt.toString()}
                renderItem={({item})=> <Coment navigation = {this.props.navigation} data={item} id={item.createdAt} />}
                />
            
            <FormComents navigation={this.props.navigation} post={this.props.route.params.post}/>
          </>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
      color: 'red'
  }
})