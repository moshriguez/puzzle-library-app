import React, { Component } from 'react';

class UserPuzzleCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.puzzle.name}</h2>
        <img src={this.props.puzzle.img_url} alt={this.props.puzzle.name} className="puzzle-img" />
        <p>{this.props.puzzle.num_of_pieces} pieces</p>
        <p>{this.props.puzzle.pieces_missing} pieces missing </p>
        <button 
        className="renew-btn" 
        // onClick={()=> this.props.handleRenew(this.props.puzzle)}
        >Renew</button>
        <button 
        className="return-btn" 
        // onClick={()=> this.props.handleRenew(this.props.puzzle)}
        >Return</button>
      </div>
    );
  }

}

export default UserPuzzleCard;