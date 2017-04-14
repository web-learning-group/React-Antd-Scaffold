import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import Init from './main.jsx'
import Home from './pages/Home.jsx'
import User from './pages/User.jsx'
import Settings from './pages/Settings.jsx'
import List from './pages/List.jsx'
import Metar from './pages/Metar.jsx'
import Station from './pages/Station.jsx'
import Taf from './pages/Taf.jsx'

// import Init from './main.jsx'
//
// ReactDOM.render(
//     <Init/>,
//     document.getElementById('init')
// );

render(
    <Router history={browserHistory}>
        <Route path='/' component={Init}>
            <IndexRoute component={Home}/>
            <Route path="list" component={List}/>
            <Route path='user' component={User}/>
            <Route path='settings' component={Settings}/>
            <Route path='metar' component={Metar}/>
            <Route path='station' component={Station}/>
            <Route path='taf' component={Taf}/>
        </Route>
    </Router>,
    document.getElementById('init')
)
