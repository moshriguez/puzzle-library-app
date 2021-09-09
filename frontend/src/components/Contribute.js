import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const URL = 'http://localhost:3001/';

const Contribute = ({ puzzles, setPuzzles }) => {
	// controlled form for user details
	const [puzzleForm, setpuzzleForm] = useState({ name: '', num_of_pieces: '', pieces_missing: '', img_url: '' });
	const handleInupt = (e) => {
		setpuzzleForm({ ...puzzleForm, [e.target.name]: e.target.value });
	};

	// Pass reference to useHistory hook
	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault();
		handleContribute(puzzleForm)
		history.push("/puzzles")
	}
	
	const handleContribute = (puzzleObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(puzzleObj),
		};
		fetch(URL + 'puzzles', configObj)
		.then((res) => res.json())
		.then((data) =>
		setPuzzles([...puzzles, data.puzzle])
		)
	};
	
	return (
		<div id="contribute-form">
			<form onSubmit={handleSubmit}>
				<h3>Donate a Puzzle:</h3>
				<p>Thank you for donating a puzzle. Your contribution is appreciated!<br />
				Please fill out the form below.</p>
				<label>Puzzle Name:</label>
				<input
					type="text"
					name="name"
					placeholder="Enter a puzzle name..."
					required
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={puzzleForm.name}
					/>
				<br />
				<label>Number of Pieces:</label>
				<input
					type="number"
					name="num_of_pieces"
					placeholder="How many pieces?"
					required
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={puzzleForm.num_of_pieces}
					/>
				<br />
				<label>Number of Missing Pieces:</label>
				<input
					type="number"
					name="pieces_missing"
					placeholder="Are there any pieces missing?"
					required
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={puzzleForm.pieces_missing}
					/>
				<br />
				{/* <input
				//? need to figure out how we want to use the category field
					type="text"
					name="category"
					placeholder="Enter a category..."
					required
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={puzzleForm.category}
				/>
				<br /> */}
				<label>Image:<span>(Enter a URL for the puzzle image)</span></label>
				<input
					type="text"
					name="img_url"
					placeholder="Enter an image URL"
					required
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={puzzleForm.img_url}
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
};

export default Contribute;
