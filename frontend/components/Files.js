import React from 'react';
import Store from '../stores/store.js';
import path from 'path';
import Link from 'next/link';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
    }

    static async getInitialProps({pathname, query, req, res, xhr, err}){
        console.log('hello');
      return {something:"something",
          pathname, query, req, res, xhr, err};
    }

    componentDidMount() {
        this.getFiles('');
    }

    play(file) {
        var route = path.join('/api/audio', file);
        this.setState({ audio: route });
    }

    getFiles(file) {
        Store.get(file)
            .then(response => {
                return response.json();
            })
            .then(value => {
                this.setState({ files: value });
            });
    }

    /* return <Link href={'/?id=' + f.id} as={f.path} /> */


/*
return <div
                    style={{ color: 'blue' }}
                    onClick={() => this.getFiles(f.id)}>
                    <span>{f.file}</span>
                </div>*/
    render() {
        console.log("props", this.props);
        var files = this.state.files.map(f => {
            if (f.isDirectory) {
                return <div
                    style={{ color: 'blue' }}
                    onClick={() => this.getFiles(f.id)}>
                    <span>{f.file}</span>
                </div>
            } else {
                return <div
                    style={{ color: 'black' }}
                    onClick={() => this.play(f.id)}>
                    <span>{f.file}</span>
                </div>
            }
        });

        var player = () => {
            if (!this.state.audio)
                return null;
            else
                return <audio src={this.state.audio} controls />
        }

        return <div>
            {player()}
            {files}
        </div>
    }
}