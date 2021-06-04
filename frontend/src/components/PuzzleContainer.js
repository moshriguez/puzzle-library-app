import React, { useState } from 'react';
import PuzzleCard from './PuzzleCard';

const PuzzleContainer = (props) => {
	const [filterValue, setFilter] = useState('All');

	const checkedOutFilter = () => {
		return props.puzzleData.filter((puzzle) => {
			switch (filterValue) {
				case 'All':
					return true;
				case 'Available':
					return puzzle.checked_out === false;
			}
		});
	};
	return (
		<React.Fragment>
			{props.noOneLoggedIn ? <p>Login to borrow a puzzle</p> : null}
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
						handleBorrow={props.handleBorrow}
						noOneLoggedIn={props.noOneLoggedIn}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

export default PuzzleContainer;
