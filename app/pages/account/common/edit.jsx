import React from 'react';
import { browserHistory } from 'react-router';
import URL from '../../../helper/url';
import Select from 'react-select';

export default React.createClass({
	getInitialState(){
		return {
			name:"",
			accounts:[],
			type:"",
			currencyType:"",
			account:null
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
	getDefaultProps: function() {
		return {
			tag: {},
			success: function(){
				browserHistory.push("/account");
			},
			error: function(err){
				console.log(err);
				browserHistory.push("/account");
			},
		};
	},
	submit(){
		$.ajax({
			url:this.props.account==null
				?URL("/api/account")
				:URL("/api/account/"+this.props.account.id),
			method:"post",
			data:{
				name:this.state.name,
				currencyType:this.state.currencyType,
				type:this.state.type,
			},
			success:this.props.success,
			error:this.props.error,
		});
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			currencyType:nextProps.account.currencyType,
			name:nextProps.account.name,
			type:nextProps.account.type
		});
	},

	newReplacementAccount:function(account){
		this.setState({
			replacement:account?account.id:null
		});
	},

	newValue:function(key,ev){
		var tmp = this.state;
		tmp[key] = ev.target.value;
		this.setState(tmp);
	},
	remove(){
		var _this = this;
		$.ajax({
			url:URL("/api/account/"+this.props.account.id+"/"+this.state.replacement),
			method:"delete",
			success:function(data){
				_this.props.success();
			},
			error:function(err){
				_this.props.error();
			}
		});
	},

	render: function() {
		var deleteSection = "";
		if (this.props.account){
			deleteSection = <div className="accounts">
				<Select
				    name="parent"
				    value={this.state.replacement}
				    labelKey="name"
				    valueKey="id"
				    onChange={this.newReplacementAccount}
				    options={this.state.accounts}/>
			</div>
		}
		return (
			<div className="edit-form form-tag">
				<label>Name</label>
				<input 
					type="text"
					placeholder = "Name" 
					className = "form-control" 
					name = "name" 
					value = {this.state.name}
				    onChange={this.newValue.bind(this,"name")} />
				<label>Type</label>
				<select 
					type="text"
					placeholder = "Type" 
					className = "form-control" 
					name = "type" 
					value = {this.state.type}
				    onChange={this.newValue.bind(this,"type")}>
				    <option value="debit">Debit</option>
				    <option value="credit">Credit</option>
				    <option value="other">Other</option>
			    </select>
				<label>Currency Type</label>
				<select 
					type="text"
					placeholder = "Type" 
					className = "form-control" 
					name = "currencyType" 
					value = {this.state.currencyType}
				    onChange={this.newValue.bind(this,"currencyType")}>
				    <option value="CAD">CAD</option>
				    <option value="USD">USD</option>
			    </select>
				<button className="btn btn-primary" onClick = {this.submit}>Submit</button>

				<div className="alert alert-danger">
					<h3>Delete</h3>
					{deleteSection}
					<button className="btn btn-secondary" onClick = {this.remove}>Delete</button>
				</div>
			</div>
		);
	}

});