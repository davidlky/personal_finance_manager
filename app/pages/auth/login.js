import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
    	<form action="/auth/login" method="post">
		    <div>
		        <label>Username:</label>
		        <input type="text" name="username"/>
		    </div>
		    <div>
		        <label>Password:</label>
		        <input type="password" name="password"/>
		    </div>
		    <div>
		        <input type="submit" value="Log In"/>
		    </div>
		</form>
	);
  }
})