import React, { Component } from 'react';

class UserPuzzleCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.borrow.puzzle.name}</h2>
        <img src={this.props.borrow.puzzle.img_url} alt={this.props.borrow.puzzle.name} className="puzzle-img" />
        <p>Due Date: {this.props.borrow.due_date.slice(0, 10)}</p>
        <p>{this.props.borrow.puzzle.num_of_pieces} pieces</p>
        <p>{this.props.borrow.puzzle.pieces_missing} pieces missing </p>
        <button 
        className="renew-btn" 
        onClick={()=> this.props.handleRenew(this.props.puzzle.borrow_id)}
        >Renew</button>
        <button 
        className="return-btn" 
        onClick={()=> this.props.handleReturn(this.props.puzzle.borrow_id)}
        >Return</button>
      </div>
    );
  }

}

export default UserPuzzleCard;
