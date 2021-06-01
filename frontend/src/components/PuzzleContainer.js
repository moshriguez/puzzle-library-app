import React from 'react';
import PuzzleCard from './PuzzleCard'

const PuzzleContainer = (props) => {
  return(
    <div id="puzzle-collection">
      {props.puzzleData.map(puzzle => <PuzzleCard key={puzzle.id} puzzle={puzzle} handleBorrow = {props.handleBorrow} />)}
    </div>
  );
}

export default PuzzleContainer;
