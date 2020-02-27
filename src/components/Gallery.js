import React from 'react'
// import PropTypes from 'prop-types'

class Gallery extends React.Component {
	state = {
		selectedImage: `url(${this.props.images})`
	}
	componentWillReceiveProps(props) {
		this.setState({
			selectedImage: `url(${props.images[0]})`
		})
	}

	selectImage = e => {
		this.setState({ selectedImage: e.target.style.backgroundImage })
	}
	render() {
		return (
			<>
				<div className="gallery">
					<div
						className="image-main"
						style={{
							backgroundImage: `${this.state.selectedImage}`
						}}
					></div>
					<div className="previews">
						{this.props.house.images.map((image, i) => (
							<div
								className="preview"
								key={i}
								style={{
									backgroundImage: `url(${image})`
								}}
								onClick={this.selectImage}
							></div>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default Gallery
