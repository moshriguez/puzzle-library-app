import React, { Component } from 'react';

class PuzzleCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.puzzle.name}</h2>
        {/* <img src={this.props.puzzle.image} alt={this.props.puzzle.name} className="puzzle-avatar" /> */}
        <p>{this.props.puzzle.pieces_missing} pieces missing </p>
        <button 
        className="borrow-btn" 
        // onClick={()=> this.props.handleBorrow(this.props.puzzle)}
        >Borrow</button>
      </div>
    );
  }

}

export default PuzzleCard;
