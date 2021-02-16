import React from 'react';
import { StyleSheet, Text, View, Header, TextInput, TouchableOpacity,
         KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import db from '../config';
import firebase from 'firebase'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      searchText: "",
      allStories: [],
    }
  }

  componentDidMount = async () => {
    const query = await db.collection('stories').get()
    query.docs.map((doc) => {
      this.setState({
        allStories: [doc.data()]
      })
    })
    console.log(this.state.allStories)
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <View style = {styles.container}>
        <SearchBar
          placeholder="Search"
          onChangeText={this.Search}
          value={this.state.searchText}
        />
        <ScrollView style = {styles.scrollView}>
          {this.state.allStories.map((story, index) => {
            return (
              <View key = {index} style = {styles.view}>
                <Text>{"Title: " + story.Title}</Text>
                <Text>{"Author: " + story.Author}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: 2,
  },
  container: {
    marginTop: 50, 
    padding: 3
  },
  scrollView:{
    marginTop: 10,
    padding: 10
  }
})