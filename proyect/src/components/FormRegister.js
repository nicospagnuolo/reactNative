import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import PostCamera from '../components/PostCamera'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email: '',
            password: '',
            error: '',
            takePicture: false,
            urlImg: '',
            step1: false
        }
    }

    componentDidUpdate(){
        if (this.state.urlImg !== '') {
          this.saveImg()
        }
      }

    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
            owner: this.state.email,
            createdAt: Date.now(),
            imgProfile: this.state.urlImg,
            name: this.state.name,
        }))
        .then((resp)=>this.actualizarPaso(resp.id))
        .catch( err =>{
             console.log(err)
            this.setState({
                error: resp.message
            })    
        })
    }

    updateImgUrl(url){
        this.setState({
          urlImg: url,
          step1: false
        })
      }

      actualizarPaso(id){
        this.setState({
          userId: id
        })
      }
      saveImg(url){
        db
        .collection('users')
        .doc(this.state.userId)
        .update({
            imgProfile: url
        })
        .then((resp) =>{
          this.setState({
            urlImg: '',
            step1: false
          }, ()=> this.props.navigation.navigate('tabNavigation'))
          
        })
        .catch((err) => console.log(err))
    }

      takePicture(){
        this.registrarUsuario(this.state.name, this.state.email, this.state.password)
        this.setState({
            step1: true
        })
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
                    this.state.step1 ?
                    <PostCamera  updateImgUrl= {(url)=> this.actualizarPaso(url)} saveImg = {(url) => this.saveImg(url)} />
                    :
                    <></>
                }


                {
                    this.state.name !== '' && this.state.email !== '' && this.state.password !== '' ?
                    <>
                        <TouchableOpacity 
                            onPress={()=> this.takePicture()}                
                            style={styles.btn}>
                        <Text style={styles.textBtn}>Take picture</Text>
                         </TouchableOpacity>
                    </>
                    :
                    <Text style= {styles.text}>Field all the sections</Text>
                    
                }

                {/* {
                this.state.step1 ?
                
                } */}

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
        flex:1,
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