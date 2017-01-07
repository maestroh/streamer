import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Files from './Files.js';

export default () => {
    return <Router history={browserHistory}>
        <Route path='/(:id)' component={Files} />
    </Router>
}