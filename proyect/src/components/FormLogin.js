import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '', 
            error: ''
        }
    }

    loginUser(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> 
            this.props.navigation.navigate('tabNavigation'), (resp)=> this.setState({
                error: 'Invalid login credentials.'
            })
        )
        .catch((e)=> console.log(e))
    }

    render() {
        return (
            <><Image
            source={{uri: require('../../assets/AboutCode.png')}}
            style = {styles.img}
            resizeMode = 'contain'/>
        <View style={styles.container}>
            <View >
            <Text style={styles.title}>Login</Text>
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
                    this.state.email !== '' && this.state.password !== '' ?
                        <TouchableOpacity 
                    onPress={()=> this.loginUser(this.state.email, this.state.password)}                
                    style={styles.btn}>
                        <Text >Login</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.text}>Fill both sections</Text>
                }

                {
                    this.state.error !== ''?
                    <Text style= {styles.text}>{this.state.error}</Text>
                    :
                    <></>

                }           
                <div>------------------------------------------------</div>
                    <TouchableOpacity style={styles.btn2} onPress={()=> this.props.navigation.navigate('register')}>
                        <Text>Register here!</Text>
                    </TouchableOpacity>
                

            </View>

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
    btn:{
        backgroundColor: '#808000',
        padding: 10,
        border: 'none',
        borderRadius: 4
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
  },
  title: {
      fontWeight: 'bold',
      fontSize: 18
  }
})

export default FormLogin