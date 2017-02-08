import React from 'react';
import { browserHistory } from 'react-router';
import URL from '../../../helper/url';
import Select from 'react-select';

export default React.createClass({
	getInitialState(){
		return {
			name:"",
			accounts:[],
			note:"",
			amount:"",
			account:null,
			tags:[],
			tags_selected:[],
			date_added:new Date().toISOString().split('T')[0],
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
		$.ajax({
			url:URL("/api/tag"),
			success:function(data){
				_this.setState({tags:data});
			},
		});
	},
	getDefaultProps: function() {
		return {
			record: {
				tags:[]
			},
			success: function(){
				browserHistory.push("/record");
			},
			error: function(err){
				console.log(err);
			},
		};
	},
	submit(){
		$.ajax({
			url:this.props.record==null
				?URL("/api/record")
				:URL("/api/record/"+this.props.record.id),
			method:"post",
			data:{
				name:this.state.name,
				account:this.state.account,
				tagId:this.state.tags_selected,
				note:this.state.note,
				amount:this.state.amount,
				date:this.state.date_added,
			},
			success:this.props.success,
			error:this.props.error,
		});
	},

	componentWillReceiveProps: function(nextProps) {
		console.log(nextProps.record);
		this.setState({
			name:nextProps.record.name,
			account:nextProps.record.account.id,
			tags_selected:nextProps.record.tags.map((el)=>el.id),
			note:nextProps.record.note,
			amount:nextProps.record.amount/100,
			date:nextProps.record.date,
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

	newTag:function(tag){
		this.setState({
			tags_selected:tag.map((el) => el.id)
		});
	},

	newAccount:function(account){
		this.setState({
			account:account.id
		});
	},

	remove(){
		var _this = this;
		$.ajax({
			url:URL("/api/record/"+this.props.record.id),
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
				<label>Note</label>
				<input 
					type="text"
					placeholder = "Note" 
					className = "form-control" 
					name = "note" 
					value = {this.state.note}
				  onChange={this.newValue.bind(this,"note")} />
				<label>Date Added</label>
				<input 
					type="date"
					placeholder = "Date" 
					className = "form-control" 
					name = "date_added" 
					value = {this.state.date_added}
				  onChange={this.newValue.bind(this,"date_added")} />
				<label>Amount</label>
				<input 
					type="integer"
					placeholder = "Amount" 
					className = "form-control" 
					name = "amount" 
					value = {this.state.amount}
				  onChange={this.newValue.bind(this,"amount")} />
				<label>Tags</label>
				<Select
			    name="tags"
			    value={this.state.tags_selected}
			    labelKey="name"
			    valueKey="id"
			    multi={true}
			    onChange={this.newTag}
			    options={this.state.tags}/>
				<label>Account</label>
				<Select
			    name="account"
			    value={this.state.account}
			    labelKey="name"
			    valueKey="id"
			    onChange={this.newAccount}
			    options={this.state.accounts}/>
				<button className="btn btn-primary" onClick = {this.submit}>Submit</button>

				<div className="alert alert-danger">
					<h3>Delete</h3>
					<button className="btn btn-secondary" onClick = {this.remove}>Delete</button>
				</div>
			</div>
		);
	}

});