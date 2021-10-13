import React from "react";

import PuzzleCard from "./PuzzleCard";

const UserPuzzleContainer = ({ borrows, handleReturn, handleRenew }) => {
    const renderBorrowedPuzzles = () => {
		return borrows.map((borrow) => {
			return (
				<PuzzleCard
					type='user'
					key={borrow.id}
					puzzle={borrow}
					handleReturn={handleReturn}
					handleRenew={handleRenew}
				/>
			);
		});
	};

    return (
        <>
            <h2>You have borrowed these puzzles:</h2>
            <div className="puzzle-collection">
                {renderBorrowedPuzzles()}
            </div>
        </>
    )
}

export default UserPuzzleContainer