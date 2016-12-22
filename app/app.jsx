import React from 'react'
import Header from './modules/header.jsx'
import Footer from './modules/footer.jsx'

export default React.createClass({
	componentDidUpdate(){
		window.scrollTo(0,0);
	},
	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		)
	}
})