import React from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import URL from '../../helper/url';
import Select from 'react-select';

export default React.createClass({
	getInitialState(){
		return {
			records:[],
			records_displayed:[],
			tags:{},
			accounts:{},
			filterTag:[],
			filterName:[],
			filterAccount:""
		};
	},
	componentWillMount(){
		var _this = this;
		$.ajax({
			url:URL("/api/record"),
			success:function(data){
				var tags = data.reduce(function(prev, curr){
					curr.tags.forEach(function(el){
						if(!prev[el.id]){
							prev[el.id] = el;
						}
					});
					return prev;
				},{});
				var accounts = data.reduce(function(prev, curr){
					if(curr.account&&!prev[curr.account.id]){
						prev[curr.account.id] = curr.account;
					}
					return prev;
				},{});
				_this.setState({
					records:data,
					records_displayed:data,
					tags:tags,
					accounts:accounts
				});
			},
		});
	},
	refilter(){
		var accounts = this.state.filterAccount;
		var tags = this.state.filterTag;
		var _this = this;
		if (accounts.length==0 && tags.length==0 && _this.state.filterName==""){
			this.setState({
				records_displayed:this.state.records
			});
		}else{
			this.setState({
				records_displayed: this.state.records.filter(function(el){
					if(_this.state.filterName!=""&&el.name.indexOf(_this.state.filterName)!=-1){
						return true;
					}
					if(accounts.length!=0&&accounts.indexOf(el.account.id)!=-1){
						return true;
					}
					if(tags.length!=0){
						var found = false;
						el.tags.forEach(function(tag){
							if(tags.indexOf(tag.id)!=-1){
								found = true;
								return true;
							}
						})
						return found;
					}
					return false;
				})
			});
		}
	},
	setTagsFilter(value){
		this.setState({
			filterTag:value
		},function(){
			this.refilter();
		});
	},
	setAccountsFilter(value){
		this.setState({
			filterAccount:value
		},function(){
			this.refilter();
		});
	},
	setNameFilter(value){
		this.setState({
			filterName:value
		},function(){
			this.refilter();
		});
	},
	render() {
		var _this = this;
		return (
			<div className="container content">
				<h1>Records</h1>
				<h4>Filter By</h4>
				<div className="row">
					<div className="col-md-4">
					<Select
					    name="tags"
					    value={this.state.filterTag}
					    labelKey="name"
					    valueKey="id"
					    multi={true}
					    placeholder="Tags"
					    onChange={(val) => (this.setTagsFilter(val.map((el)=>el.id)))}
					    options={Object.keys(this.state.tags).map((el)=>_this.state.tags[el])}/>
					</div>
					<div className="col-md-4">
					<Select
					    name="accounts"
					    value={this.state.filterAccount}
					    labelKey="name"
					    valueKey="id"
					    multi={true}
					    placeholder="Accounts"
					    onChange={(val) => (this.setAccountsFilter(val.map((el)=>el.id)))}
					    options={Object.keys(this.state.accounts).map((el)=>_this.state.accounts[el])}/>
					</div>
					<div className="col-md-4">
						<input 
							className="form-control" 
							placeholder="Name" 
							type="text" 
							value={this.state.filterName}
							onChange={(ev) => {this.setNameFilter(ev.target.value)}} />
					</div>
				</div>
				<br />
				<button className="btn btn-primary" onClick={() => browserHistory.push("/record/create")}>Create New Record</button>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Amount</th>
							<th>Date Added</th>
							<th>Note</th>
							<th>Account</th>
							<th>Tags</th>
						</tr>
					</thead>
					<tbody>
					{_this.state.records_displayed.map(function(item){
						return (
							<tr key = {item.id}>
								<td>{item.name}</td>
								<td>{item.amount/100}{item.account.currencyType}</td>
								<td>{(new Date(item.date_added)).toLocaleDateString()}</td>
								<td>{item.note}</td>
								<td><span className="label label-warning" onClick={_this.setAccountsFilter.bind(_this,[item.account.id])}>{item.account.name}</span></td>
								<td>{item.tags.map(function(tag){
										return (<span key={tag.id} className="label label-primary" onClick={_this.setTagsFilter.bind(_this,[tag.id])}>{tag.name}</span>);
								})}</td>
								<td>
									<button className="btn btn-primary" onClick = {() => browserHistory.push("/record/edit/"+item.id)}>Edit</button>
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