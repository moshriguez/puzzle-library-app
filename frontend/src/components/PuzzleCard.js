import React from 'react';

const PuzzleCard = ({ puzzle, noOneLoggedIn, handleBorrow }) => {

  
  return (
    <div className="card">
      <h2>{puzzle.name}</h2>
      <img src={puzzle.img_url} alt={puzzle.name} className="puzzle-img" />
      <p>{puzzle.num_of_pieces} pieces</p>
      <p>{puzzle.pieces_missing} pieces missing</p>
      <span>{puzzle.checked_out ? "checked out" : "available"}</span>
      <button 
      disabled={noOneLoggedIn || puzzle.checked_out}
      className="borrow-btn" 
      onClick={()=> handleBorrow(puzzle.id)}
      >Borrow</button>
    </div>
  );

}

export default PuzzleCard;
