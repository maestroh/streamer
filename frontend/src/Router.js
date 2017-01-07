import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Player from './Player.js';

export default () => {
    return <Router history={browserHistory}>
        <Route path='/(:id)' component={Player} />
    </Router>
}