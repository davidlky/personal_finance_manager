import React from 'react';
import {Link} from 'react-router';
import URL from '../../helper/url';
import Form from './common/edit.jsx';

export default React.createClass({
	getInitialState: function() {
		return {
			tag: {}
		};
	},
	componentWillMount(){
		var _this = this;
		$.ajax({
			url:URL("/api/tag/"+this.props.params.id),
			success:function(data){
				_this.setState({tag:data});
			},
		});
	},
	render() {
		var _this = this;
		return (
			<div className="container content">
				<Form 
					tag={this.state.tag} />
			</div>
		);
	}
})