import React from 'react';
import Store from './store.js';

export default class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { audio: undefined };
    }

    componentDidMount() {
        // subscript to audio changes and set state
        Store.subscribe((audio) => {
            this.setState({audio:audio});
        });
    }

    render() {
        return this.state.audio ?
            <audio src={this.state.audio} controls />
            : <div>Audio Player Here</div>;
    }
}