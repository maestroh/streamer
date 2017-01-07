import React from 'react';
import Store from './store.js';
import path from 'path';
import { Link } from 'react-router';
import Files from './Files.js';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var player = () => {
      if (!this.state.audio)
        return null;
      else
        return <audio src={this.state.audio} controls />
    }

    return <div>
      <Files directory={this.props.params.id}/>
    </div>
  }
}