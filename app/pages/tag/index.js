import React from 'react';
import {Link} from 'react-router';
import URL from '../../helper/url';

export default React.createClass({
	getInitialState(){
		return {
			tags:[]
		};
	},
	componentWillMount(){
		var _this = this;
		$.ajax({
			url:URL("/api/tag"),
			success:function(data){
				_this.setState({tags:data});
			},
		});
	},
	render() {
		var _this = this;
		return (
			<div className="container content">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Parent</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
					{_this.state.tags.map(function(item){
						var parentName = 
							_this.state.tags.filter(function(el){
								return el.id==item.parentTag;
							})[0];
						return (
							<tr key = {item.id}>
								<td>{item.name}</td>
								<td>{parentName?parentName.name:""}</td>
								<td><button className="btn btn-primary">Edit</button></td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		);
	}
})