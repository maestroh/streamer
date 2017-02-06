import React from 'react';
import Store from './store.js';
import Router from './Router.js';
import Player from './Player.js';

export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = { audio: undefined };
    }

  componentDidMount() {
    // subscript to audio changes and set state
    Store.subscribe((audio) => {
      this.setState({ audio: audio });
    });
  }

  render() {
    return <div>
      <Player audio={this.state.audio} />
      <Router />
    </div>
  }
}
