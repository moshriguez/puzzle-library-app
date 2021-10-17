import React from "react";
import PuzzleCard from "./PuzzleCard";

const UserHistory = ({borrowHistory, windowWidth}) => {

    const renderBorrowHistory = () => {
        return borrowHistory.map((hist) => {
            return (
                <PuzzleCard 
                    type='history'
                    key={hist.id}
                    puzzle={hist}
                    windowWidth={windowWidth}
                />
            )
        })
    }
    return (
        <>
            <h2>Your Borrow History</h2>
            {renderBorrowHistory()}
        </>
    )
    
}

export default UserHistory