import React, { useEffect, useState } from 'react';
import UserPuzzleCard from './UserPuzzleCard'

const UserContainer = (props) => {
	const [puzzles, setPuzzles] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:9393/${props.userData.id}`)
			.then((res) => res.json())
			.then(puzzles => setPuzzles(puzzles.puzzles));
	}, []);

    const renderBorrowedPuzzles = () => {
        return puzzles.map((puzzle) => {
            return (
                <UserPuzzleCard key={puzzle.id} puzzle={puzzle}/>
            )
        })
    }

	return (
		<div id="user-container">
			<h1>{props.userData.name}</h1>
			<h4>You have borrowed these puzzles:</h4>
            {renderBorrowedPuzzles()}
		</div>
	);
};

export default UserContainer;
