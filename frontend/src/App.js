import React from 'react';
import Router from './Router.js';
import Playlist from './Playlist.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dir: undefined, fileIndex: undefined };
  }

  render() {
    return <div style={{display:'flex'}}>
      <Router />
      <Playlist />
    </div>
  }
}
