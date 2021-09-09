import React, { useState } from 'react';
import PuzzleCard from './PuzzleCard';

const PuzzleContainer = ({ puzzleData, userData, handleBorrow }) => {
	const [filterValue, setFilter] = useState('All');

	const noOneLoggedIn = userData.id === 0

	const checkedOutFilter = () => {
		return puzzleData.filter((puzzle) => {
			switch (filterValue) {
				case 'All':
					return true;
				case 'Available':
					return puzzle.checked_out === false;
				default:
					return true;
			}
		});
	};
	return (
		<React.Fragment>
			{noOneLoggedIn ? <p>Login to borrow a puzzle</p> : null}
			<p>Filter by Availablity:</p>
			<select id="filter" onChange={(e) => setFilter(e.target.value)}>
				<option value="All">All</option>
				<option value="Available">Available</option>
			</select>
			<div className="puzzle-collection">
				{checkedOutFilter().map((puzzle) => (
					<PuzzleCard
						key={puzzle.id}
						puzzle={puzzle}
						handleBorrow={handleBorrow}
						noOneLoggedIn={noOneLoggedIn}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

export default PuzzleContainer;
