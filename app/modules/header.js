import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {browserHistory} from 'react-router'
import AuthCheck from '../helper/auth'

export default React.createClass({
  getInitialState(){
    return{
      authenticated:true
    }
  },
  componentDidUpdate(){
    var _this = this;
    AuthCheck(function(response){
      console.log(response);
      if (!response){
        browserHistory.push("/login");
        if (_this.state.authenticated){
          _this.setState({
            authenticated:false
          })
        }
      }else{
        if (!_this.state.authenticated){
          _this.setState({
            authenticated:true
          })
        }
      }
    })
  },
  render() {
    var navbar = 
      <Nav pullRight>
        <LinkContainer to="/record" activeClassName="active">
          <MenuItem  eventKey={2} >Records</MenuItem>
        </LinkContainer>
        <LinkContainer to="/tag" activeClassName="active">
          <MenuItem  eventKey={1} >Tags</MenuItem>
        </LinkContainer>
        <LinkContainer to="/account" activeClassName="active">
          <MenuItem  eventKey={2} >Accounts</MenuItem>
        </LinkContainer>
      </Nav>;
    if (!this.state.authenticated){
      navbar = null;
    }
    return (
    	<div className="home-header">
         <Navbar className="navbar navbar-normal-pages navbar-show">
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="navbar-brand" to="/">
                  <p>Personal Finance Manager</p>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              {navbar}
            </Navbar.Collapse>
          </Navbar>
    	</div>
    	)
  }
})