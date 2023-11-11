import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
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
        <View style={styles.container}>
            <View>
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
                        <Text style={styles.textBtn}>Login</Text>
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

export default FormLogin