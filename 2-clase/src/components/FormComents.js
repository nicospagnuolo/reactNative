import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            coment:''
        }
    }

    addComent(coment){
        console.log(coment)
    }

    render() {
        return (
        <View>
            <Text>Add coments</Text>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'coment'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({coment: text}) }
                />
                <TouchableOpacity 
                onPress={()=> this.addComent(this.state.coment)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Add coment</Text>
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

export default FormRegister