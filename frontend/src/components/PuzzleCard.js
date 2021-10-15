import React from 'react';

const PuzzleCard = ({ type, windowWidth, puzzle, noOneLoggedIn, handleBorrow, handleReturn, handleRenew }) => {

  const renderButtons = (str) => {
    switch (str) {
      case 'puzzle':
          return (
            <button 
              disabled={noOneLoggedIn || puzzle.checked_out}
              className="btn" 
              onClick={()=> handleBorrow(puzzle.id)}
            >Borrow</button>  
          )
      case 'user':
        return (
          <div className="btn-grp-row">
            <button 
              className="btn" 
              onClick={()=> handleRenew(puzzle.id)}
            >Renew</button>
            <button 
              className="btn" 
              onClick={()=> handleReturn(puzzle.id)}
            >Return</button>
          </div>
        )
      case 'history':
        return null
      default:
        break;
    }
  }
  
  return (
    <div className={windowWidth && windowWidth > 650 ? "long-card" : "card"}>
      <h2>{puzzle.name}</h2>
      <img src={puzzle.img_url} alt={puzzle.name} className="puzzle-img" />
      <div className="flex-container">
        {type === 'user' ? <p>Due Date: {puzzle.due_date.slice(0, 10)}</p> : null}
        <p>{puzzle.num_of_pieces} pieces</p>
        <span>({puzzle.pieces_missing} missing)</span>
        {type === 'puzzle' ? <span>{puzzle.checked_out ? "checked out" : "available"}</span> : null}
        {renderButtons(type)}
      </div>
    </div>
  );

}
// 
export default PuzzleCard;
