import React from 'react';
import { Text, ListView, View, TouchableHighlight } from 'react-native';
import { directoryStore, playStore } from './store';

export default class Files extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.file !== r2.file });
    this.state = { ds };
  }

  componentWillMount() {
    directoryStore
      .directories$
      .subscribe({
        next: value => {
          this.setState({
            ds: this.state.ds.cloneWithRows(value)
          })
        }
      });
    directoryStore.get();
  }

  render() {
    console.log(this.state.files);
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this._renderRow}
      />
    );
  }

  _renderRow = (rowData, sectionID, rowID, highlightRow) => {
    if (rowData.isDirectory) {
      return <TouchableHighlight onPress={() => directoryStore.get(rowData.id)}>
        <Text>{rowData.file}</Text>
      </TouchableHighlight>
    } else {
     return <TouchableHighlight onPress={() => this._play(rowData.id)}>
        <Text>{rowData.file}</Text>
      </TouchableHighlight>
    }
  }

  _play(file) {
    // raise event to play file
    //playlistStore.load(this.state.files.filter((f) => !f.isDirectory), file);
    playStore.play(file);
}


}