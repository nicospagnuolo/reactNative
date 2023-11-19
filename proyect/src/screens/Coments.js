import React, { Component } from 'react'
import {View, FlatList, Text, StyleSheet, Image, ImageBackground } from 'react-native'
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
      <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
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
                renderItem={({item})=> <View style={styles.container2}>
                <Text style={styles.txt}><Image
            source={{uri: item.imgProfile}}
            style = {styles.imgP}
            resizeMode = 'contain'
            /><Text style={styles.txt3}>
            {item.owner}</Text>: {item.coment}</Text></View>
        }
                />
            
            <FormComents navigation={this.props.navigation} post={this.props.route.params.post}/>
          </>
        </View>
        </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  text: {
      color: 'red'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex:1,
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'black',
    width: 600,
    margin: 20,
    padding: 20,
    borderRadius: 20
  },
  txt: {
    color: 'white',
  }, 
  txt3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  imgP: {
      width: 80,
      height: 80,
      borderRadius: 50
  }
})