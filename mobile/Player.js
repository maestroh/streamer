import React from 'react';
import { playlistStore } from './store';
import { Audio } from 'expo';
import { StyleSheet, Text, View } from 'react-native';


export default class Player extends React.Component {
  componentDidMount() {
    playlistStore.subscribe((files, file) => {
      playStore.play(file);
      this.setState({ files: files, file: file });
    })
  }

  render() {
    return <View style={styles.buttons}>
      <Text>Prev</Text>
      <Text>Play</Text>
      <Text>Next</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50
  },
});