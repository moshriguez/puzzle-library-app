import React from 'react';

const UserPuzzleCard = ({ borrow, handleRenew, handleReturn }) => {

    return (
      <div className="card">
        <h2>{borrow.name}</h2>
        <img src={borrow.img_url} alt={borrow.name} className="puzzle-img" />
        <p>Due Date: {borrow.due_date.slice(0, 10)}</p>
        <p>{borrow.num_of_pieces} pieces</p>
        <p>{borrow.pieces_missing} pieces missing </p>
        <button 
        className="renew-btn" 
        onClick={()=> handleRenew(borrow.id)}
        >Renew</button>
        <button 
        className="return-btn" 
        onClick={()=> handleReturn(borrow.id)}
        >Return</button>
      </div>
    );

}

export default UserPuzzleCard;
