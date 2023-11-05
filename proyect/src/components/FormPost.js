import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

class FormPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            coment:'',
            // img:'',
        }
    }

    

    render() {
        return (
        <View>
            <Text>New post</Text>
            <View>
            <TextInput
                    style = {styles.input}
                    placeholder = 'Image of your code'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({img: text}) }
                />
                <TextInput
                    style = {styles.input}
                    placeholder = 'Coment for the post'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({coment: text}) }
                />
                <TouchableOpacity 
                onPress={(obj)=> this.props.onSubmit({
                    description: this.state.coment})}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Add post</Text>
                </TouchableOpacity>

            </View>

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
        backgroundColor:'purple',
        padding:16
    },
    textBtn:{
        color:'white'
    }
})

export default FormPost