import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email: '',
            password: '',
            error: '',
            urlImg: ''
        }
    }


    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            db.collection('users').add({
                owner: this.state.email,
                createdAt: Date.now(),
                imgProfile: this.state.urlImg,
                name: this.state.name,
            })
            .then((resp)=>this.props.navigation.navigate('AdicionalInfo', {docId: resp.id}))
            .catch( err =>{
                console.log(err)
                this.setState({
                    error: err.message
                })  
            })
        })
        .catch(err =>{
            console.log(err)
            this.setState({
                error: err.message
            })  
        })
        
    }


    render() {
        return (
            <><Image
            source={{uri: require('../../assets/AboutCode.png')}}
            style = {styles.img}
            resizeMode = 'contain'/>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
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
                        <Text >Register</Text>
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
            </>
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
        backgroundColor: '#b0c4de',
        borderRadius: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    btn:{
        backgroundColor: '#808000',
        padding: 10,
        border: 'none',
        borderRadius: 4,
    },
    btn2:{
        backgroundColor: '#808000',
        padding: 10,
        border: 'none',
        borderRadius: 4
    },
    textBtn:{
        color:'white'
    },
    text: {
        color: 'red'
    },
    img: {
    width: 140,
    height: 140,
    borderRadius: 90
  }
})

export default FormRegister