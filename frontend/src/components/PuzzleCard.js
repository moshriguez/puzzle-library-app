import React, { Component } from 'react';

class PuzzleCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.puzzle.name}</h2>
        <img src={this.props.puzzle.img_url} alt={this.props.puzzle.name} className="puzzle-img" />
        <p>{this.props.puzzle.num_of_pieces} pieces</p>
        <p>{this.props.puzzle.pieces_missing} pieces missing</p>
        <span>{this.props.puzzle.checked_out ? "checked out" : "available"}</span>
        <button 
        disabled={this.props.noOneLoggedIn || this.props.puzzle.checked_out}
        className="borrow-btn" 
        onClick={()=> this.props.handleBorrow(this.props.puzzle.id)}
        >Borrow</button>
      </div>
    );
  }

}

export default PuzzleCard;
