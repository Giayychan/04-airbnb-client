import React from 'react'
import axios from 'axios'
import Thumbnails from './Thumbnails'
import Nav from './Nav'
import Pin from './Pin'
import { Link } from 'react-router-dom'
import GoogleMap from 'google-map-react'
import '../styles/cards.css'
import '../styles/grid.css'
import '../styles/maps.css'

class Houses extends React.Component {
	state = {
		houses: [],
		originalHouses: [],
		types: [],
		map: {
			key: {
				key: 'AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0'
			},
			center: {
				lat: -8.652,
				lng: 115.137
			},
			zoom: 14
		}
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				this.setState({
					houses: res.data,
					originalHouses: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
		axios
			.get(`${process.env.REACT_APP_API}/types`)
			.then(res => {
				this.setState({
					types: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	search = e => {
		let houses = this.state.originalHouses.filter(house => {
			return (
				house.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
				house.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
				house.region.toLowerCase().includes(e.target.value.toLowerCase())
			)
		})
		this.setState({ houses: houses })
	}

	filter = e => {
		let houses = this.state.originalHouses.filter(house => {
			return house.type._id === e.target.value
		})
		if (e.target.value === 'All Types') {
			this.setState({ houses: this.state.originalHouses })
		} else {
			this.setState({ houses: houses })
		}
	}

	filterBedroomsFunc = e => {
		let houses = this.state.originalHouses.filter(house => {
			return house.bedrooms >= e.target.value
		})
		this.setState({ houses: houses })
	}

	filterMaxPrice = num => {
		let houses = this.state.originalHouses.filter(house => {
			return house.price >= num.target.value
		})
		this.setState({ houses: houses })
	}

	houseHover = id => {
		let houses = this.state.originalHouses
		houses.map(e => {
			return e._id === id ? (e.selected = true) : (e.selected = false)
		})
		this.setState({ houses: houses })
	}

	render() {
		return (
			<>
				<Nav />
				<div className="filters">
					<select onChange={this.filterBedroomsFunc}>
						{[...Array(6)].map((e, i) => {
							let x = (i += 1)
							return (
								<option value={x} key={i}>
									Min Bedrooms: {x}
								</option>
							)
						})}
					</select>
					<select onChange={this.filter}>
						<option value="All Types">All Types</option>
						{this.state.types.map(type => {
							return (
								<option value={type._id} key={type._id}>
									{type.name}
								</option>
							)
						})}
					</select>
					<input
						type="number"
						placeholder="max price"
						onChange={this.filterMaxPrice}
					/>
					<select>
						<option value="price">Lowest Price</option>
						<option value="rating">Highest Rating</option>
					</select>
					<input
						type="text"
						className="search"
						placeholder="Search..."
						onChange={this.search}
					/>
				</div>
				<div className="grid map">
					<Thumbnails
						house={this.state.houses}
						key={this.state.houses._id}
						houseHover={this.houseHover}
					/>
					<div className="map">
						<GoogleMap
							bootstrapURLKeys={this.state.map.key}
							center={this.state.map.center}
							zoom={this.state.map.zoom}
						>
							{this.state.houses.map((house, i) => (
								<Pin house={house} lat={house.lat} lng={house.lng} key={i} />
							))}
						</GoogleMap>
					</div>
				</div>
			</>
		)
	}
}

export default Houses
