import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email: '',
            password: '',
            minibio:''
        }
    }

    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
                owner: this.state.email,
                createdAt: Date.now(),
                name: this.state.name,
                minibio: this.state.minibio
            })
        )
        .then((resp) => console.log(resp))
        .catch( err => console.log(err))
    }

    render() {
        return (
        <View>
            <Text>Register in (nombre de la app)</Text>
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
                    placeholder = 'Email address'
                    keyboardType = 'email-address'
                    value = {this.state.email}
                    onChangeText = { (text) => this.setState({email: text}) }
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Create your bio'
                    value={this.state.minibio}
                    onChangeText={(text) => this.setState({minibio: text})}
                />
                <TextInput
                    style = {styles.input}
                    placeholder = 'Password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />

                <Text
                    style={styles.textLink}
                >
                    Already have an account?
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Login')}
                    >
                        Login here!
                    </TouchableOpacity>
                </Text>


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.email, this.state.password)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Register now</Text>
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
    },
    textLink:{
        marginBottom:24
    }
})

export default FormRegister