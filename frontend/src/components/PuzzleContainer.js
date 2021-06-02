import React from 'react';
import PuzzleCard from './PuzzleCard';

const PuzzleContainer = (props) => {
	return (
		<React.Fragment>
			{props.noOneLoggedIn ? <p>Login to borrow a puzzle</p> : null}
			<div className="puzzle-collection">
				{props.puzzleData.map((puzzle) => (
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
