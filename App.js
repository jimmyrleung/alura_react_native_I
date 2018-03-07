import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import Post from './components/Post';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    }
  };

  componentDidMount() {
    fetch("http://192.168.1.66:3002/api/photos", {
      "Content-type": "application/json",
      method: "GET"
    }).then(res => res.json())
      .then(fotos => {
        this.setState({ fotos: fotos })
      })
      .catch(err => console.warn(error));
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { marginTop: 20, alignSelf: 'stretch', flex: 1 }
});