import React from 'react'
// import PropTypes from 'prop-types'

class Review extends React.Component {
	render() {
		return (
			<>
				{this.props.reviews.map((review, i) => {
					return (
						<div className="card review" key={i}>
							<div className="content">
								<div className="user">
									<div
										className="avatar"
										style={{
											backgroundImage: `url(${review.author.avatar})`
										}}
									></div>
									<div className="name">
										<span>{review.author.name}</span>
										<small>{review.author.location}</small>
									</div>
								</div>
								<div className="rating">
									{[...Array(review.rating)].map((e, i) => {
										return <i className="fas fa-star" key={i}></i>
									})}
									{[...Array(5 - review.rating)].map((e, i) => {
										return <i className="far fa-star" key={i}></i>
									})}
								</div>
								<p>{review.content}</p>
							</div>
						</div>
					)
				})}
			</>
		)
	}
}

export default Review
