import { View, StyleSheet, ActivityIndicator, FlatList, Text} from 'react-native'
import React, { Component } from 'react'
import Contador from '../components/Contador'


class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            hayDatos: false
        }
    }
    componentDidMount(){
        fetch('https://rickandmortyapi.com/api/character')
        .then(res => res.json())
        .then( data => this.setState({
          data: data,
          hayDatos: true
        }, console.log(data)))
        .catch(err => console.log(err))
    }

    render() {
    return (
            this.state.hayDatos === false ?
            <ActivityIndicator
                    size={32}
                    color={'blue'}
                />
                :
                <View style={styles.containerGral}>
                   <Text>Home</Text>
                </View>
                
        )
    }
}

const styles = StyleSheet.create(
    {
        containerGral:{
            flex:1
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