import React from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
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
	remove(tag){
		var newTags = this.state.tags;
		newTags.splice(newTags.indexOf(tag), 1)
		var _this = this;
		$.ajax({
			url:URL("/api/tag/"+tag.id),
			method:"delete",
			success:function(data){
				_this.setState({tags: newTags});
			},
		});
	},
	render() {
		var _this = this;
		return (
			<div className="container content">
				<h1>Tags</h1>
				<button className="btn btn-primary" onClick={() => browserHistory.push("/tag/create")}>Create New Tag</button>
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
								<td>
									<button className="btn btn-primary" onClick = {() => browserHistory.push("/tag/edit/"+item.id)}>Edit</button>
									<button className="btn btn-secondary" onClick = {_this.remove.bind(_this,item)}>Remove</button>
								</td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		);
	}
})