import React from 'react';
import { Link } from 'react-router-dom'

const Splash = () => {
	return (
		<div className="flex-container">
			<h3>When was the last time you did a puzzle a second time?</h3>
			<h3>Why buy a puzzle when you can borrow one?</h3>
			<div>
				<p>Borrowing puzzles:</p>
				<ul>
					<li>Saves you money!</li>
					<li>Saves you space at home!</li>
					<li>Is good for the environment!</li>
				</ul>
			</div>
			<div className="btn-grp-row">
				<Link to="/signup" className="btn link" >Sign up</Link>
				<Link to="/login" className="btn link" >Login</Link>
          </div>

		</div>
	);
};

export default Splash;
