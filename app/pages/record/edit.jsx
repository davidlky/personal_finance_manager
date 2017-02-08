import React from 'react';
import {Link} from 'react-router';
import URL from '../../helper/url';
import Form from './common/form.jsx';

export default React.createClass({
  getInitialState: function() {
    return {
      record: {}
    };
  },
  componentWillMount(){
    var _this = this;
    $.ajax({
      url:URL("/api/record/"+this.props.params.id),
      success:function(data){
        _this.setState({record:data});
      },
    });
  },
  render() {
    var _this = this;
    return (
      <div className="container content">
        <Form 
          record={this.state.record} />
      </div>
    );
  }
})