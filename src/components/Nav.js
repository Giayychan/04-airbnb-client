import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

class Nav extends React.Component {
	render() {
		return (
			<>
				<nav>
					<Link to="/" className="logo"></Link>
					<div className="profile">
						<Link to="/plus" className="button">
							<span>Airbnb Plus</span>
						</Link>
					</div>
				</nav>
			</>
		)
	}
}

export default Nav
