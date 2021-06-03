import React from 'react';
import UserPuzzleCard from './UserPuzzleCard';

const UserContainer = (props) => {
	const renderBorrowedPuzzles = () => {
		return props.puzzles.map((puzzle) => {
			return (
				<UserPuzzleCard
					key={puzzle.id}
					puzzle={puzzle}
					handleReturn={props.handleReturn}
					handleRenew={props.handleRenew}
				/>
			);
		});
	};

	return (
		<div id="user-container">
			{props.noOneLoggedIn ? (
				<h4>
					Login or create an account to see your borrowed puzzles
					here.
				</h4>
			) : (
				<React.Fragment>
					<h1>{props.userData.name}</h1>
					<h4>You have borrowed these puzzles:</h4>
					<div className="puzzle-collection">
						{renderBorrowedPuzzles()}
					</div>
					<button onClick={() => props.deleteUser(props.userData)}>
						Delete Account
					</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default UserContainer;
