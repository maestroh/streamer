import React from 'react';
import Store from './store.js';
import path from 'path';
import { Link } from 'react-router'

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
    }

    componentDidMount() {
        this.getFiles(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        console.log('received props', nextProps.params.id);
        this.getFiles(nextProps.params.id);
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
                console.log('set state', value);
                this.setState({ files: value });
            });
    }

    render() {
        console.log("props", this.props.params.id);
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