import React from 'react';
import Store from './store.js';
import { Link } from 'react-router';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

componentWillMount() {
    this.getFiles(this.props.directory);
  }

  componentWillReceiveProps(nextProps) {
    this.getFiles(nextProps.directory);
  }

  getFiles(directory){
    Store.get(directory)
      .then(response => {
        return response.json();
      })
      .then(value => {
        this.setState({ files: value });
      });
  }

  play(file) {
    // raise event to play file
  }

  render() {
    var files = this.state.files.map(f => {
      if (f.isDirectory) {
        return <div>
          <Link
            key={f.id}
            style={{ color: 'blue' }}
            to={`/${f.id}`}>
            {f.file}
          </Link>
        </div>
      } else {
        return <div
          key={f.id}
          style={{ color: 'black' }}
          onClick={() => this.play(f.id)}>
          <span>{f.file}</span>
        </div>
      }
    });

    return <div>
      {files}
    </div>
  }
}