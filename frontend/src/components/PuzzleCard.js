import React from 'react';

const PuzzleCard = ({ windowWidth, puzzle, noOneLoggedIn, handleBorrow }) => {

  
  return (
    <div className={windowWidth > 650 ? "long-card" : "card"}>
      <h2>{puzzle.name}</h2>
      <img src={puzzle.img_url} alt={puzzle.name} className="puzzle-img" />
      <div className="flex-container">
        <p>{puzzle.num_of_pieces} pieces</p>
        <span>({puzzle.pieces_missing} missing)</span>
        <span>{puzzle.checked_out ? "checked out" : "available"}</span>
        <button 
          disabled={noOneLoggedIn || puzzle.checked_out}
          className="btn" 
          onClick={()=> handleBorrow(puzzle.id)}
        >Borrow</button>
      </div>
    </div>
  );

}

export default PuzzleCard;
