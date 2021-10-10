import React from 'react';
import UserTabs from "./UserTabs";

const UserContainer = ({ borrows, handleReturn, handleRenew, deleteUser, userData }) => {
	const noOneLoggedIn = userData.id === 0

	return (
		<div className="flex-container">
			{noOneLoggedIn ? (
				<h3>
					Login or create an account to see your borrowed puzzles here.
				</h3>
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
