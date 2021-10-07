import React from 'react';
import UserPuzzleCard from './UserPuzzleCard';
import UserTabs from "./UserTabs";

const UserContainer = ({ borrows, handleReturn, handleRenew, deleteUser, userData }) => {
	const noOneLoggedIn = userData.id === 0
	// const renderBorrowedPuzzles = () => {
	// 	return borrows.map((borrow) => {
	// 		return (
	// 			<UserPuzzleCard
	// 				key={borrow.id}
	// 				borrow={borrow}
	// 				handleReturn={handleReturn}
	// 				handleRenew={handleRenew}
	// 			/>
	// 		);
	// 	});
	// };

	return (
		<div id="user-container">
			{noOneLoggedIn ? (
				<h4>
					Login or create an account to see your borrowed puzzles here.
				</h4>
			) : (
				<UserTabs 
					borrows={borrows}
					handleRenew={handleRenew}
					handleReturn={handleReturn}
					deleteUser={deleteUser}
					userData={userData}
				/>
				// <React.Fragment>
				// 	<h1>{userData.username}</h1>
				// 	<h4>You have borrowed these puzzles:</h4>
				// 	<div className="puzzle-collection">
				// 		{renderBorrowedPuzzles()}
				// 	</div>
				// 	<button 
				// 		onClick={() => deleteUser(userData)}
				// 		id="delete-btn">
				// 		Delete Account
				// 	</button>
				// </React.Fragment>
			)}
		</div>
	);
};

export default UserContainer;
