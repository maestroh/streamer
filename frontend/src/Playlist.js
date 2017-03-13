import React from 'react';
import { playStore, playlistStore } from './store.js';
import Player from './Player.js'

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = { audio: undefined, files: [] };
  }
  componentDidMount() {
    // subscript to audio changes and set state
    playStore.subscribe((audio) => {
      this.setState({ audio: audio });
    });

    playlistStore.subscribe((files, file) => {
      playStore.play(file);
      this.setState({ files: files });
    })
  }

  render() {
    var files = this.state.files.map(f =>
      <div
        key={f.id}
        style={{ color: 'black' }}
        onClick={() => playStore.play(f.id)}>
        <span>{f.file}</span>
      </div>
    );

    return <div>
      <Player audio={this.state.audio} />
      <div>
        {files}
      </div>
    </div>
  }
}