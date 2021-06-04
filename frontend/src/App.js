import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	withRouter,
} from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Contribute from './components/Contribute';
import PuzzleContainer from './components/PuzzleContainer';
import UserContainer from './components/UserContainer';
import Splash from './components/Splash'

const URL = 'http://localhost:9393/';

class App extends React.Component {
	state = {
		currentUser: { name: 'no one', id: 0 },
		userPuzzles: [],
		puzzles: [],
	};

	componentDidMount() {
		fetch(URL + 'puzzles')
			.then((res) => res.json())
			.then((puzzleData) => {
				this.setState({
					puzzles: puzzleData.puzzles,
				});
			});
	}

	handleLogin = (userObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		};
		fetch(URL + 'users', configObj)
			.then((res) => res.json())
			.then((userData) => {
				const userPuzzles = userData.puzzles.map((puzzle) => {
					const borrowData = userData.borrows.find(
						(borrow) => borrow.puzzle_id === puzzle.id
					);
					puzzle.due_date = borrowData.due_date;
					puzzle.borrow_id = borrowData.id;
					return puzzle;
				});
				this.setState({
					currentUser: userData.user,
					userPuzzles: userPuzzles,
				});
			});
	};

	handleLogout = () => {
		this.setState({
			currentUser: { name: 'no one', id: 0 },
			userPuzzles: [],
		});
	};

	handleContribute = (puzzleObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(puzzleObj),
		};
		fetch(URL + 'puzzles', configObj)
			.then((res) => res.json())
			.then((data) =>
				this.setState({ puzzles: [...this.state.puzzles, data.puzzle] })
			)
	};

	handleBorrow = (puzzleId) => {
		const body = {
			puzzle_id: puzzleId,
			user_id: this.state.currentUser.id,
		};
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		fetch(URL + 'user_puzzles', configObj)
			.then((res) => res.json())
			.then((puzzleData) => {
				const updatedPuzzles = this.state.puzzles.map((puzzle) => {
					if (puzzle.id === puzzleData.puzzle.id) {
						return puzzleData.puzzle;
					} else {
						return puzzle;
					}
				});
				const borrowedPuzzle = puzzleData.puzzle;
				borrowedPuzzle.due_date = puzzleData.borrow.due_date;
				borrowedPuzzle.borrow_id = puzzleData.borrow.id;
				this.setState({
					userPuzzles: [...this.state.userPuzzles, borrowedPuzzle],
					puzzles: updatedPuzzles,
				});
			});
	};

	handleReturn = (borrow_id) => {
		const configObj = {
			method: 'DELETE',
		};
		fetch(URL + `user_puzzles/${borrow_id}`, configObj)
			.then((res) => res.json())
			.then((data) => {
				const updatedUserPuzzles = this.state.userPuzzles.filter(
					(puzzle) => puzzle.borrow_id !== borrow_id
				);
				const updatedPuzzles = this.state.puzzles.map((puzzle) => {
					if (puzzle.id === data.returned_puzzle_id) {
						puzzle.checked_out = false;
						return puzzle;
					} else {
						return puzzle;
					}
				});
				this.setState({
					userPuzzles: updatedUserPuzzles,
					puzzles: updatedPuzzles,
				});
			});
	};

	handleRenew = (borrow_id) => {
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		};
		fetch(URL + `user_puzzles/${borrow_id}`, configObj)
			.then((res) => res.json())
			.then((borrowData) => {
				const updatedUserPuzzles = this.state.userPuzzles.map(
					(puzzle) => {
						if (puzzle.id === borrowData.borrow.puzzle_id) {
							puzzle.due_date = borrowData.borrow.due_date;
							return puzzle;
						} else {
							return puzzle;
						}
					}
				);
				this.setState({
					userPuzzles: updatedUserPuzzles,
				});
			});
	};

	deleteUser = (user) => {
		const configObj = {
			method: 'DELETE',
		};
		fetch(URL + `users/${user.id}`, configObj)
			.then((res) => res.json())
			.then(() => {
				const updatedPuzzles = this.state.puzzles.map((puzzle) => {
					if (
						this.state.userPuzzles.find((up) => puzzle.id === up.id)
					) {
						puzzle.checked_out = false;
						return puzzle;
					} else {
						return puzzle;
					}
				});
				this.setState({
					currentUser: { name: 'no one', id: 0 },
					userPuzzles: [],
					puzzles: updatedPuzzles,
				});
			});
	};

	render() {
		return (
			<Router>
				<ul className="navbar">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/puzzles">Puzzles</Link>
					</li>
					<li>
						{this.state.currentUser.id === 0 ? (
							<Link to="/login">Login</Link>
						) : (
							<Link to="/user">User</Link>
						)}
					</li>
					{/* <li>
						<Link to="/login">Login</Link>
					</li> */}
					<li>
						<Link to="/contribute">Donate a Puzzle</Link>
					</li>
				</ul>
				<header className="App-header">
					<h1>PuzzleTeca</h1>
					{this.state.currentUser.id === 0 ? null : (
						<button id="logout-btn" onClick={this.handleLogout}>
							Logout
						</button>
					)}
					<p>{this.state.currentUser.name} is currently logged in</p>
				</header>
				<Switch>
					<main>
						<img
						src="https://marketingtechnews.net/wp-content/uploads/sites/6/2021/02/sigmund-B-x4VaIriRc-unsplash.jpg"
						alt="close up of a puzzle"
						/>

						<Route exact path="/">
							<Splash />
						</Route>
						<Route exact path="/puzzles">
							<PuzzleContainer
								puzzleData={this.state.puzzles}
								handleBorrow={this.handleBorrow}
								noOneLoggedIn={
									this.state.currentUser.id === 0
								}
							/>
						</Route>
						<Route exact path="/user">
							<UserContainer
								userData={this.state.currentUser}
								puzzles={this.state.userPuzzles}
								handleReturn={this.handleReturn}
								handleRenew={this.handleRenew}
								deleteUser={this.deleteUser}
								noOneLoggedIn={
									this.state.currentUser.id === 0
								}
							/>
						</Route>
						<Route exact path="/login">
							<Login handleLogin={this.handleLogin} />
						</Route>
						<Route exact path="/contribute">
							<Contribute
								handleContribute={this.handleContribute}
							/>
						</Route>
					</main>
				</Switch>
			</Router>
		);
	}
}

export default withRouter(App);
