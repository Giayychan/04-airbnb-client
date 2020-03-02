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
		},
		selectedHouse: '',
		filter: {}
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
	houseHover = (id, boolean) => {
		let selectedHouseId = id
		let houses = this.state.originalHouses
		if (boolean) {
			houses.map(e => {
				return e._id === id ? (e.selected = true) : (e.selected = false)
			})
		} else {
			houses.map(e => {
				e.selected = false
				return e
			})
		}
		// this.setState({ houses })
		this.setState({ selectedHouse: selectedHouseId })
	}

	allfilter = (e, typeOfFilter) => {
		let filter = this.state.filter
		filter[typeOfFilter] = e.target.value
		this.setState({ filter })
		let houses = this.state.originalHouses
		if (this.state.filter.type && this.state.filter.type !== 'All Types') {
			houses = houses.filter(house => house.type._id === this.state.filter.type)
		}
		if (this.state.filter.price) {
			houses = houses.filter(house => house.price <= this.state.filter.price)
		}
		if (this.state.filter.search) {
			houses = houses.filter(house => {
				return (
					house.title
						.toLowerCase()
						.includes(this.state.filter.search.toLowerCase()) ||
					house.city
						.toLowerCase()
						.includes(this.state.filter.search.toLowerCase()) ||
					house.region
						.toLowerCase()
						.includes(this.state.filter.search.toLowerCase())
				)
			})
		}
		if (this.state.filter.minBedroom) {
			houses = houses.filter(house => {
				return house.bedrooms >= e.target.value
			})
		}
		if (this.state.filter.sortBy === 'rating') {
			houses.sort((a, b) => {
				return b.rating - a.rating
			})
		}

		if (this.state.filter.sortBy === 'price') {
			houses.sort((a, b) => {
				return a.price - b.price
			})
		}

		this.setState({ houses })
	}

	render() {
		return (
			<>
				<Nav />
				<div className="filters">
					<select onChange={e => this.allfilter(e, 'minBedroom')}>
						{[...Array(6)].map((e, i) => {
							let x = (i += 1)
							return (
								<option value={x} key={i}>
									Min Bedrooms: {x}
								</option>
							)
						})}
					</select>
					<select onChange={e => this.allfilter(e, 'type')}>
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
						onChange={e => this.allfilter(e, 'price')}
					/>
					<select onChange={e => this.allfilter(e, 'sortBy')}>
						<option value="price">Lowest Price</option>
						<option value="rating">Highest Rating</option>
					</select>
					<input
						type="text"
						className="search"
						placeholder="Search..."
						onChange={e => this.allfilter(e, 'search')}
					/>
				</div>
				<div className="grid map">
					<Link to={`/houses/${this.state.selectedHouse}`}>
						<Thumbnails
							house={this.state.houses}
							key={this.state.houses._id}
							houseHover={this.houseHover}
						/>
					</Link>
					<div className="map">
						<GoogleMap
							bootstrapURLKeys={this.state.map.key}
							center={this.state.map.center}
							zoom={this.state.map.zoom}
						>
							{this.state.houses.map((house, i) => (
								<Pin
									house={house}
									lat={house.lat}
									lng={house.lng}
									key={i}
									houseHover={this.houseHover}
								/>
							))}
						</GoogleMap>
					</div>
				</div>
			</>
		)
	}
}

export default Houses
