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

//Account
import AccountIndex from './pages/account/index.jsx';
import AccountCreate from './pages/account/create.jsx';
import AccountEdit from './pages/account/edit.jsx';

//Record
import RecordIndex from './pages/record/index.jsx';
import RecordCreate from './pages/record/create.jsx';
import RecordEdit from './pages/record/edit.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/tag">
      	<IndexRoute component={TagIndex}/>
      	<Route path="create" component={TagCreate}/>
      	<Route path="edit/:id" component={TagEdit}/>
      </Route>
      <Route path="/account">
        <IndexRoute component={AccountIndex}/>
        <Route path="create" component={AccountCreate}/>
        <Route path="edit/:id" component={AccountEdit}/>
      </Route>
      <Route path="/record">
        <IndexRoute component={RecordIndex}/>
        <Route path="create" component={RecordCreate}/>
        <Route path="edit/:id" component={RecordEdit}/>
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))