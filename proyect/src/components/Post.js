import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import { EvilIcons } from '@expo/vector-icons'; 

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
        <TouchableOpacity onPress={()=> this.goProfile()}><Text><Image
            source={{uri: this.state.usuario.imgProfile ? this.state.usuario.imgProfile : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
            style = {styles.imgP}
            resizeMode = 'contain'
            />  {this.state.usuario.owner}</Text></TouchableOpacity>
        <Image
            source={{uri: this.props.data.data.img ? this.props.data.data.img : ''}}
            style = {styles.img}
            resizeMode = 'contain'

        />
        
        <Text >{this.state.usuario.name}: {this.props.data.data.description}</Text>
        
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
        <Text >{this.state.likes}  likes</Text>
        <TouchableOpacity style={styles.btn} onPress={()=> this.irComentar()}>
            <Text >View coments</Text>
        </TouchableOpacity>
        <FlatList
            data={this.props.data.data.coments.slice(-4).reverse()} // electiva de mostrar 4 comentarios
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View >
                <Text>{item.owner}:</Text>
                <Text>{item.coment}</Text>
              </View>
            )}
          />
        {
            this.props.profile ?
            <>
            <div>----------------</div>
            <TouchableOpacity onPress={() => this.deletePost(this.props.id)} style= {styles.btn}>
                <Text><EvilIcons name="trash" size={24} color="black" />Delete post</Text>
            </TouchableOpacity>
            </>
            :
            <></>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 200
    },
    card: {
        alignSelf: "baseline",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 10,
        padding: 20,
        borderRadius: 30,
        width: 500,
        textAlign: "center",
    },
    btn: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: 10,
        border: 'none',
        borderRadius: 4
    },
    imgP: {
        width: 40,
        height: 40,
        borderRadius: 20
      }
})