import React from 'react';
import UserTabs from "./UserTabs";

const UserContainer = ({ borrows, handleReturn, handleRenew, deleteUser, userData }) => {
	const noOneLoggedIn = userData.id === 0

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
			)}
		</div>
	);
};

export default UserContainer;
