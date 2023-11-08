import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email: '',
            password: ''
        }
    }

    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
            owner: this.state.email,
            createdAt: Date.now(),
            imgProfile: this.props.img,
            name: this.state.name,

        }))
        .then((resp)=> console.log(resp))
        .catch( err => console.log(err))
    }

    render() {
        return (
        <View>
            <Text>Registrate a mi app</Text>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Name'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({name: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    value = {this.state.email}
                    onChangeText = { (text) => this.setState({email: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                {
                    this.state.name !== '' && this.state.email !== '' && this.state.password !== '' ?
                    <>
                        <TouchableOpacity 
                            onPress={()=> this.registrarUsuario(this.state.name, this.state.email, this.state.password)}                
                            style={styles.btn}>
                        <Text style={styles.textBtn}>Register</Text>
                         </TouchableOpacity>
                    </>
                    :
                    <Text style= {styles.text}>Field all the sections</Text>


                }
                
                

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
    },
    text: {
        color: 'red'
    }
})

export default FormRegister