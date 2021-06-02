import React from 'react';

class Contribute extends React.Component {
	state = {
		name: '',
		num_of_pieces: '',
        pieces_missing: '', 
        category: '',
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
		this.props.handleContribute(puzzleObj)
		this.setState({
			name: '',
			num_of_pieces: '',
			pieces_missing: '', 
			category: '',
			img_url: ''
		})
	}
	
	render() {

		return (
			<div id="contribute-form">
				<form onSubmit={this.handleSubmit}>
					<h3>Donate a Puzzle:</h3>
                    <p>Thank you for donating a puzzle. Please fill out the form below.</p>
					<input
						type="text"
						name="name"
						placeholder="Enter a puzzle name..."
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.name}
					/>
					<br />
                    <input
						type="number"
						name="num_of_pieces"
						placeholder="How many pieces?"
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.num_of_pieces}
					/>
					<br />
                    <input
						type="number"
						name="pieces_missing"
						placeholder="Are there any pieces missing?"
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.pieces_missing}
					/>
					<br />
                    <input
						type="text"
						name="category"
						placeholder="Enter a category..."
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.category}
					/>
					<br />
					<input
						type="text"
						name="img_url"
						placeholder="Enter an image URL"
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
