import React from 'react'

class Pin extends React.Component {
	state = {
		house: this.props.house,
		lat: this.props.lat,
		lng: this.props.lng
	}
	componentWillMount() {
		this.setState({
			house: this.props.house,
			lat: this.props.lat,
			lng: this.props.lng
		})
	}
	componentWillReceiveProps(props) {
		this.setState({
			house: this.props.house,
			lat: this.props.lat,
			lng: this.props.lng
		})
	}
	render() {
		return (
			<div
				className={this.state.house.selected ? 'pin selected' : 'pin'}
				lat={this.state.lat}
				lng={this.state.lng}
				onMouseEnter={e => {
					return this.props.houseHover
						? this.props.houseHover(this.state.house._id, true)
						: null
				}}
				onMouseLeave={e => {
					return this.props.houseHover
						? this.props.houseHover(this.state.house._id, false)
						: null
				}}
			>
				<label>${this.state.house.price}</label>
			</div>
		)
	}
}

export default Pin
