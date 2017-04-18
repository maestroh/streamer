import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ToolbarAndroid from 'ToolbarAndroid';
import StatusBar from 'StatusBar';
import Files from './Files';
import Player from './Player';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ToolbarAndroid 
          title=" Streamer" 
          titleColor="white"
          logo={require('./streamer1.png')}
          style={styles.toolbar}
        />
          <Files />
          <Player />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'flex-start',
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: '#222222',
    height: 50,
  },
});
