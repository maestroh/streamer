import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Files from './Files.js';

export default () => {
    return <Router history={browserHistory}>
        <Route path='/**' component={Files} />
    </Router>
}