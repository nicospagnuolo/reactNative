import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import { EvilIcons } from '@expo/vector-icons'; 
import FormComents from './FormComents';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            likes: 0,
            myLike: false,
            profile: false,
            usuario: ''
        }
    }

    componentDidMount(){
        let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email)
        if(estaMiLike){
            this.setState({myLike: true})
        }
        db.collection('users').where("owner", "==", this.props.data.data.owner).onSnapshot((docs)=>{
            let arrUsuario = []
            docs.forEach((doc) => {
              arrUsuario.push({
                id:doc.id,
                data: doc.data()
              })
            })
      
            this.setState({
              usuario : arrUsuario[0].data 
            }, () => console.log(this.state.usuario))
      
        })

        this.setState({
            likes: this.props.data.data.likes.length
        })   
        
        

    }
    
    like(){
        db
        .collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                myLike:true,
                likes: this.state.likes + 1
            })
        })
        .catch((err) => console.log(err))
    }

    unLike(){
        db
        .collection('posts')
        .doc(this.props.data.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                myLike:false,
                likes: this.state.likes - 1
            })
        })
        .catch((err) => console.log(err))
    }

    deletePost(postId){
        db.collection('posts')
        .doc(postId)
        .delete()
    }
    

    irComentar(){
        this.props.navigation.navigate('coments', {post: this.props.id})
    }

    goProfile(){
        this.props.data.data.owner === auth.currentUser.email ? this.props.navigation.navigate('Profile'): this.props.navigation.navigate('userProfile', {usuario: this.props.data.data.owner})
    }

  render() {
    return (
      <View style = {styles.card}>
        <TouchableOpacity onPress={()=> this.goProfile()}><Text style={styles.txt1}><Image
            source={{uri: this.state.usuario.imgProfile}}
            style = {styles.imgP}
            resizeMode = 'contain'
            />  {this.state.usuario.owner}</Text></TouchableOpacity>
        <Image
            source={{uri: this.props.data.data.img}}
            style = {styles.img}
            resizeMode = 'contain'
        />
        
        <Text><Text style={styles.txt3}>{this.state.usuario.name}</Text>: <Text style={styles.txt}>  {this.props.data.data.description}</Text></Text>
        
        {
            this.state.myLike === false ?
            <TouchableOpacity onPress={() => this.like()} >
                <FontAwesome
                    name='heart-o'
                    color='red' 
                    size={24}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.unLike()}>
                <FontAwesome
                name='heart'
                color='red' 
                size={24}/>
            </TouchableOpacity>
        }
        <Text style={styles.txt}>{this.state.likes}  likes</Text>
        <TouchableOpacity style={styles.btn} onPress={()=> this.irComentar()}>
            <Text style={styles.txt}>View coments</Text>
        </TouchableOpacity>
        
        {
            this.props.data.data.coments.length === 0 ?
            <Text style={styles.txt4}>No coments</Text>
            :
            <FlatList
            data={this.props.data.data.coments.slice(-4).reverse()} 
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=> 
                <Text style={styles.txt}><Image
            source={{uri: item.imgProfile}}
            style = {styles.imgP}
            resizeMode = 'contain'
            /><Text style={styles.txt3}>
            {item.owner}</Text>: {item.coment}</Text>
        }
        />
        }
        {
            this.props.profile ?
            <>
            <div>----------------</div>
            <TouchableOpacity onPress={() => this.deletePost(this.props.id)} style= {styles.btn}>
                <Text style={styles.txt}><EvilIcons name="trash" size={24} color="white" />Delete post</Text>
            </TouchableOpacity>
            </>
            :
            <FormComents navigation={this.props.navigation} post={this.props.data.id}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        width: 300,
        height: 300,
        margin: 20,
    },
    card: {
        alignSelf: "baseline",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        width: 500,
        textAlign: "center",
    },
    btn: {
        backgroundColor: '#778899',
        padding: 10,
        border: 'none',
        borderRadius: 4
    },
    imgP: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    txt: {
        color: 'white'
    },
    txt1: {
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'white',
        fontStyle: 'italic',
        fontSize: 15
    },
    txt3: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15

    },
    txt4: {
        color: 'red',
    }
})