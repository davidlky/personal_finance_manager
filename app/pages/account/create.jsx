import React from 'react';
import {Link} from 'react-router';
import URL from '../../helper/url';
import Form from './common/edit.jsx';

export default React.createClass({
	render() {
		var _this = this;
		return (
			<div className="container content">
				<Form />
			</div>
		);
	}
})