import React from 'react';
import { browserHistory } from 'react-router';
import URL from '../../../helper/url';
import Select from 'react-select';

export default React.createClass({
	getInitialState(){
		return {
			tags:[],
			parent:""
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
	getDefaultProps: function() {
		return {
			tag: {},
			success: function(){
				browserHistory.push("/tag");
			},
			error: function(err){
				console.log(err);
				browserHistory.push("/tag");
			},
		};
	},
	submit(){
		$.ajax({
			url:this.props.tag==null
				?URL("/api/tag")
				:URL("/api/tag/"+this.props.tag.id),
			method:"post",
			data:{
				name:this.state.name,
				parentTag:this.state.parent,
			},
			success:this.props.success,
			error:this.props.error,
		});
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			parent:nextProps.tag.parentTag,
			name:nextProps.tag.name
		});
	},

	newValue:function(tag){
		console.log(tag);
		this.setState({
			parent:tag?tag.id:null
		});
	},

	newName:function(ev){
		this.setState({
			name:ev.target.value
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
				    onChange={this.newName} />
				<label>Parent</label>
				<Select
				    name="parent"
				    value={this.state.parent}
				    labelKey="name"
				    valueKey="id"
				    onChange={this.newValue}
				    options={this.state.tags}/>
				<button className="btn btn-primary" onClick = {this.submit}>Submit</button>
			</div>
		);
	}

});