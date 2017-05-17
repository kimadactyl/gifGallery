import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TouchableHighlight style={styles.touch}>
          <View style={styles.touch}>
            <ImageBox />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class ImageBox extends React.Component {

  constructor() {
    super()
    this.state = {
      imageURL: '',
      isLoading: true
    }
  }

  _getImage() {
    fetch('http://192.168.1.116:4567/image.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        this.setState({
          imageURL: responseJson.video,
          isLoading: false
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this._getImage();
    console.log(this.state.imageURL)
  }

  render() {
    if(this.state.isLoading) {
      return <Text>Loading...</Text>
    } else {
      return <Image style={styles.image} source={{uri: this.state.imageURL}} />
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flex: 1
  },
  touch: {
    flex: 1
  }
});
