import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Home from './pages/home';
import App from './app';

//Auth
import Login from './pages/auth/login';

//Tag
import TagIndex from './pages/tag/';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/tag">
      	<IndexRoute component={TagIndex}/>
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))