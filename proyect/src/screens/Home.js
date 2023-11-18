import { View, StyleSheet, ActivityIndicator, FlatList, Text, ImageBackground} from 'react-native'
import React, { Component } from 'react'
import {db} from '../firebase/config'
import Post from '../components/Post'


class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            posts:[],
            hayDatos: false
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs =>{
            let arrPosts = []
            docs.forEach(doc =>{
                arrPosts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            arrPosts.length > 0 ?
                this.setState({
                    hayDatos: true,
                })
                :
                this.setState({
                    hayDatos: false
                })
            this.setState({
                posts: arrPosts
            })
        })
    }

    render() {
    return (
        <ImageBackground source={require('../../assets/fondoHome.jpeg')} style={styles.backgroundImage}>
        <View style={styles.containerGral}>
            {
                this.state.hayDatos === false  ?
                <ActivityIndicator
                        size={32}
                        color={'blue'}
                    />
                    :
                    <>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=> <Post navigation = {this.props.navigation} data={item} id={item.id} />}
                    />
                    </>
            }
        </View>
        </ImageBackground>
                
        )
    }
}

const styles = StyleSheet.create(
    {
        containerGral:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', 
            justifyContent: 'center',
          }
    }
) 
export default Home