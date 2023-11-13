import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email: '',
            password: '',
            error: ''
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
        .then((resp)=> this.props.actualizarPaso(resp.id), (resp)=> this.setState({
            error: resp.message
        }))
        .catch( err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register on About Code</Text>
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

                {
                    this.state.error !== ''?
                    <Text style= {styles.text}>{this.state.error}</Text>
                    :
                    <></>
                }  
                <div>------------------------------------------------</div>
                <TouchableOpacity style={styles.btn2} onPress={()=> this.props.navigation.navigate('login')}>
                    <Text>Login here!</Text>
                </TouchableOpacity>
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
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    btn:{
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: 10,
        border: 'none',
        borderRadius: 4
    },
    btn2:{
        backgroundColor: '#87ceeb',
        color: '#fff',
        padding: 10,
        border: 'none',
        borderRadius: 4
    },
    textBtn:{
        color:'white'
    },
    text: {
        color: 'red'
    }
})

export default FormRegister