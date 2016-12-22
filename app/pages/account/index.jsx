import React from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import URL from '../../helper/url';

export default React.createClass({
	getInitialState(){
		return {
			accounts:[]
		};
	},
	componentWillMount(){
		var _this = this;
		$.ajax({
			url:URL("/api/account"),
			success:function(data){
				_this.setState({accounts:data});
			},
		});
	},
	render() {
		var _this = this;
		return (
			<div className="container content">
				<h1>Accounts</h1>
				<button className="btn btn-primary" onClick={() => browserHistory.push("/account/create")}>Create New Account</button>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Currency</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
					{_this.state.accounts.map(function(item){
						return (
							<tr key = {item.id}>
								<td>{item.name}</td>
								<td>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
								<td>{item.currencyType}</td>
								<td>
									<button className="btn btn-primary" onClick = {() => browserHistory.push("/account/edit/"+item.id)}>Edit</button>
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