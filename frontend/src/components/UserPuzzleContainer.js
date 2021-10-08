import React from "react";

import UserPuzzleCard from "./UserPuzzleCard";

const UserPuzzleContainer = ({ borrows, handleReturn, handleRenew }) => {
    const renderBorrowedPuzzles = () => {
		return borrows.map((borrow) => {
			return (
				<UserPuzzleCard
					key={borrow.id}
					borrow={borrow}
					handleReturn={handleReturn}
					handleRenew={handleRenew}
				/>
			);
		});
	};

    return (
        <>
            <h3>You have borrowed these puzzles:</h3>
            <div className="puzzle-collection">
                {renderBorrowedPuzzles()}
            </div>
        </>
    )
}

export default UserPuzzleContainer