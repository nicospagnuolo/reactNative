import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class User extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text><Image
            source={{uri: this.props.data.data.img ? this.props.data.data.img : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
            style = {styles.img}
            resizeMode = 'contain'
            /> {this.props.data.data.name} </Text>
            <Text>Email:  {this.props.data.data.owner}</Text>
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
    width: 250,
    textAlign: "center",

  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
})