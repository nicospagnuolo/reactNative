import React, { Component } from 'react'
import {View } from 'react-native'
import FormComents from '../components/FormComents'
import { db } from '../firebase/config'
export default class Register extends Component {
  constructor(props){
    super(props)
  }

//   componentDidMount(){
//     db.collection('coments').where("owner", "==", auth.currentUser.email).orderBy('createdAt', 'asc').onSnapshot(docs =>{
//         let arrPosts = []
//         docs.forEach(doc =>{
//             arrPosts.push({
//                 id: doc.id,
//                 data: doc.data()
//             })
//         })
//         arrPosts.length > 0 ?
//             this.setState({
//                 hayDatos: true
//             })
//             :
//             this.setState({
//                 hayDatos: false
//             })
//         this.setState({
//             posts: arrPosts
//         })
//     })
// }

  render() {
    return (
      <View>
          

        <FormComents navigation={this.props.navigation} post={this.props.route.params.post}/>
        
        </View>
    )
  }
}