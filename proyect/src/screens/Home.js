import { View, StyleSheet, ActivityIndicator, FlatList, Text} from 'react-native'
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
        container : {
            flex : 2,
            alignContent:'centrer'
    
        },
        containerGrande:{
            flex:3,
            backgroundColor:'blue'
        },
        containerChico:{
            flex:1,
            backgroundColor:'orange'
        }
    }
) 
export default Home