import React from 'react';
import UserPuzzleCard from './UserPuzzleCard'

const UserContainer = (props) => {

    const renderBorrowedPuzzles = () => {
        return props.puzzles.map((puzzle) => {
            return (
                <UserPuzzleCard 
				key={puzzle.id} 
				puzzle={puzzle}
				handleReturn={props.handleReturn}/>
            )
        })
    }

	return (
		<div id="user-container">
			<h1>{props.userData.name}</h1>
			<h4>You have borrowed these puzzles:</h4>
			<div className="puzzle-collection">
            	{renderBorrowedPuzzles()}
			</div>
			<button>Delete Account</button>
		</div>
	);
};

export default UserContainer;
