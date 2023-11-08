import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    loginUser(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> {
            this.props.navigation.navigate('tabNavigation')
        })
        .catch((e)=> console.log(e))
    }

    render() {
        return (
        <View>
            <Text>Login to you account</Text>
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

export default FormLogin