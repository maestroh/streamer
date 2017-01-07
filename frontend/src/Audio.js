import React from 'react';
import Store from './store.js';

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.audio ? 
        <audio src={this.props.audio} controls />
        : null;
  }
}