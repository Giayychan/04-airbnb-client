import React from 'react'
import axios from 'axios'
import Thumbnails from './Thumbnails'
import Nav from './Nav'

class Favorites extends React.Component {
	state = {
		houses: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses?plus=true`)
			.then(res => {
				this.setState({ houses: res.data })
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<>
				<Nav />
				<div className="narrow">
					<Thumbnails house={this.state.houses} key={this.state.houses._id} />
				</div>
			</>
		)
	}
}

export default Favorites
