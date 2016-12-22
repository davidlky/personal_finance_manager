import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Home from './pages/home.jsx';
import App from './app.jsx';

//Auth
import Login from './pages/auth/login.jsx';

//Tag
import TagIndex from './pages/tag/index.jsx';
import TagCreate from './pages/tag/create.jsx';
import TagEdit from './pages/tag/edit.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/tag">
      	<IndexRoute component={TagIndex}/>
      	<Route path="create" component={TagCreate}/>
      	<Route path="edit/:id" component={TagEdit}/>
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))