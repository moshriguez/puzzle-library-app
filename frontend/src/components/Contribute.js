import React from 'react';

class Contribute extends React.Component {
	state = {
		name: '',
		num_of_pieces: '',
        pieces_missing: '', 
        // category: '',
		img_url: ''
	}

	handleInupt = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const puzzleObj = {...this.state}
        puzzleObj.checked_out = false
		puzzleObj.category = 'general'
		this.props.handleContribute(puzzleObj)
		this.setState({
			name: '',
			num_of_pieces: '',
			pieces_missing: '', 
			// category: '',
			img_url: ''
		})
	}
	
	render() {

		return (
			<div id="contribute-form">
				<form onSubmit={this.handleSubmit}>
					<h3>Donate a Puzzle:</h3>
                    <p>Thank you for donating a puzzle. Your contribution is appreciated!</p>
					<p>Please fill out the form below.</p>
					<label>Puzzle Name:</label>
					<input
						type="text"
						name="name"
						placeholder="Enter a puzzle name..."
						required
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.name}
					/>
					<br />
					<label>Number of Pieces:</label>
                    <input
						type="number"
						name="num_of_pieces"
						placeholder="How many pieces?"
						required
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.num_of_pieces}
					/>
					<br />
					<label>Number of Missing Pieces:</label>
                    <input
						type="number"
						name="pieces_missing"
						placeholder="Are there any pieces missing?"
						required
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.pieces_missing}
					/>
					<br />
                    {/* <input
						type="text"
						name="category"
						placeholder="Enter a category..."
						required
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.category}
					/>
					<br /> */}
					<label>Image of Puzzle:<span>(Enter a URL for the puzzle image)</span></label>
					<input
						type="text"
						name="img_url"
						placeholder="Enter an image URL"
						required
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.img_url}
					/>
					<br />
					<input
						className="btn"
						type="submit"
						name="submit"
						value="Submit"
					/>
				</form>
			</div>
		);
	}
};

export default Contribute;
