import React from 'react'
// import PropTypes from 'prop-types'

class Thumbnails extends React.Component {
	render() {
		return (
			<>
				<div className="grid four large">
					{// List of thumbnails
						this.props.house.map(house => (
							<a
								className="card link"
								href={`/houses/${house._id}`}
								key={house._id}
								onMouseEnter={e => {
									return this.props.houseHover
										? this.props.houseHover(house._id)
										: null
								}}
							>
								<div
									className="image"
									style={{
										backgroundImage: `url(${house.images[0]})`
									}}
								></div>
								<div className="content">
									<small className="meta">
										{house.type.name} • {house.bedrooms} Bedrooms
									</small>
									<h2>{house.title}</h2>
									<small className="location">
										<i className="fas fa-map-marker-alt"></i>
										<span>
											{house.city}, {house.region}
										</span>
									</small>
									<span className="price">${house.price}/night</span>
									<span className="rating">
										{[...Array(house.rating)].map((e, i) => {
											return <i className="fas fa-star" key={i}></i>
										})}
										{[...Array(5 - house.rating)].map((e, i) => {
											return <i className="far fa-star" key={i}></i>
										})}
									</span>
								</div>
							</a>
						))}
				</div>
			</>
		)
	}
}

export default Thumbnails
