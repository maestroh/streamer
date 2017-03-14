import React from 'react';
import { playStore, playlistStore } from './store.js';
import Player from './Player.js'

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = { audio: undefined, files: [] };
    this.ended = this.ended.bind(this);
    this.play = this.play.bind(this);
  }
  componentDidMount() {
    // subscript to audio changes and set state
    playStore.subscribe((audio) => {
      this.setState({ audio: audio });
    });

    playlistStore.subscribe((files, file) => {
      playStore.play(file);
      this.setState({ files: files, file: file });
    })
  }

  ended() {
    let index = this.state.files.findIndex((file) => this.state.file === file.id);
    if (index !== -1 && index !== this.state.files.length - 1) {
      let file = this.state.files[index + 1].id;
      this.setState({ file: file });
      playStore.play(file);
    }
  }

  play(file){
    this.setState({file:file});
    playStore.play(file);
  }

  render() {
    var files = this.state.files.map(f =>
      <div
        key={f.id}
        style={{ color: f.id === this.state.file ? 'blue' : 'black' }}
        onClick={() => this.play(f.id)}>
        <span>{f.file}</span>
      </div>
    );

    return <div>
      <Player audio={this.state.audio} ended={this.ended} />
      <div>
        {files}
      </div>
    </div>
  }
}