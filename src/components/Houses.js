import React from "react";
import axios from "axios";
import Thumbnails from "./Thumbnails";
import Nav from "./Nav";
import Pin from "./Pin";
import GoogleMapReact from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";

class Houses extends React.Component {
	state = {
		houses: [],
		originalHouses: [],
		types: [],
		map: {
			center: {
				lat: -8.652,
				lng: 115.137
			},
			zoom: 14
		},
		selectedHouse: "",
		filter: {}
	};
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then((res) => {
				this.setState({
					houses: res.data,
					originalHouses: res.data
				});
			})
			.catch((err) => {
				console.log({ err });
			});
		axios
			.get(`${process.env.REACT_APP_API}/types`)
			.then((res) => {
				this.setState({
					types: res.data
				});
			})
			.catch((err) => {
				console.log({ err });
			});
	}
	houseHover = (id, boolean) => {
		console.log(id, boolean);
		let selectedHouseId = id;
		let houses = this.state.originalHouses;
		if (boolean) {
			houses.map((e) => {
				return e._id === id ? (e.selected = true) : (e.selected = false);
			});
			this.setState({ selectedHouse: selectedHouseId });
		} else {
			houses.map((e) => {
				e.selected = false;
				return e;
			});
			this.setState({ selectedHouse: "" });
		}
		
	};

	allfilter = (e, typeOfFilter) => {
		let filter = this.state.filter;
		filter[typeOfFilter] = e.target.value;
		this.setState({ filter });
		let houses = this.state.originalHouses;
		if (this.state.filter.type && this.state.filter.type !== "All Types") {
			houses = houses.filter(
				(house) => house.type._id === this.state.filter.type
			);
		}
		if (this.state.filter.price) {
			houses = houses.filter((house) => house.price <= this.state.filter.price);
		}
		if (this.state.filter.search) {
			houses = houses.filter((house) => {
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
				);
			});
		}
		if (this.state.filter.minBedroom) {
			houses = houses.filter((house) => {
				return house.bedrooms >= this.state.filter.minBedroom;
			});
		}
		if (this.state.filter.sortBy === "rating") {
			houses.sort((a, b) => {
				return b.rating - a.rating;
			});
		}

		if (this.state.filter.sortBy === "price") {
			houses.sort((a, b) => {
				return a.price - b.price;
			});
		}

		this.setState({ houses });
	};

	render() {
		return (
			<>
				<Nav />
				<div className='filters'>
					<select onChange={(e) => this.allfilter(e, "minBedroom")}>
						{[...Array(6)].map((e, i) => {
							let x = (i += 1);
							return (
								<option value={x} key={i}>
									Min Bedrooms: {x}
								</option>
							);
						})}
					</select>
					<select onChange={(e) => this.allfilter(e, "type")}>
						<option value='All Types'>All Types</option>
						{this.state.types.map((type) => {
							return (
								<option value={type._id} key={type._id}>
									{type.name}
								</option>
							);
						})}
					</select>
					<input
						type='number'
						placeholder='max price'
						onChange={(e) => this.allfilter(e, "price")}
					/>
					<select onChange={(e) => this.allfilter(e, "sortBy")}>
						<option value='price'>Lowest Price</option>
						<option value='rating'>Highest Rating</option>
					</select>
					<input
						type='text'
						className='search'
						placeholder='Search...'
						onChange={(e) => this.allfilter(e, "search")}
					/>
				</div>
				<div className='grid map'>
					<Thumbnails
						house={this.state.houses}
						key={this.state.houses._id}
						houseHover={this.houseHover}
						selectedHouse={this.state.selectedHouse}
					/>
					<div className='map'>
						<GoogleMapReact
							bootstrapURLKeys={{
								key: "AIzaSyARw0GJCssVS7rNeudFzdyXtCXEw8mceLs"
							}}
							defaultCenter={this.state.map.center}
							defaultZoom={this.state.map.zoom}
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
						</GoogleMapReact>
					</div>
				</div>
			</>
		);
	}
}

export default Houses;
