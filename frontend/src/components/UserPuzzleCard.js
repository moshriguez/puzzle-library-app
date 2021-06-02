import React, { Component } from 'react';

class UserPuzzleCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.puzzle.name}</h2>
        <img src={this.props.puzzle.img_url} alt={this.props.puzzle.name} className="puzzle-img" />
        <p>Due Date: {this.props.puzzle.due_date}</p>
        <p>{this.props.puzzle.num_of_pieces} pieces</p>
        <p>{this.props.puzzle.pieces_missing} pieces missing </p>
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
