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
        <View>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Coment for the post'
                    keyboardType = 'default'
                    value = {this.props.stateDescription}
                    onChangeText = { (text) => this.props.updateDescription(text) }
                />

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