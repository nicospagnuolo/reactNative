import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class FormPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            coment:'',
        }
    }

    

    render() {
        return (
        <View style={styles.container}>
            <Text>New post</Text>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Coment for the post'
                    keyboardType = 'default'
                    value = {this.props.stateDescription}
                    onChangeText = { (text) => this.props.updateDescription(text) }
                />

        </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        width: '100%',
        padding: 8,
        marginBottom: 16,
        boxSizing: "border-box",
        borderWidth: 1,
        borderColor: 'grey',
    },
    container: {
        width: 350,
        margin: 50, 
        padding: 20,
        backgroundColor: '#fff',
    },
    textBtn:{
        color:'white'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
})

export default FormPost