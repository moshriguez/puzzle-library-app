import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Contribute from './components/Contribute';
import PuzzleContainer from './components/PuzzleContainer';
import UserContainer from './components/UserContainer';

const URL = 'http://localhost:9393/';

class App extends React.Component {
	state = {
		currentUser: { name: 'no one' },
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
			.then(userData => {
				const userPuzzles = userData.puzzles.map(puzzle => {
					const borrowData = userData.borrows.find(borrow => borrow.puzzle_id === puzzle.id)
					puzzle.due_date = borrowData.due_date
					puzzle.borrow_id = borrowData.id
					return puzzle
				})
				this.setState({
				currentUser: userData.user,
				userPuzzles: userPuzzles
			})})
			.finally(this.props.history.push('/user'))

		// want to redirect to /user after 'logging in'
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
			.finally(this.props.history.push('/puzzles'))
		// want to redirect to /puzzles after adding
	};

	handleBorrow = (puzzleId) => {
		const body = {puzzle_id: puzzleId, user_id: this.state.currentUser.id}
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}
		fetch(URL + 'user_puzzles', configObj)
		.then(res => res.json())
		.then(puzzleData => {
			const updatedPuzzles = this.state.puzzles.map(puzzle => {
				if (puzzle.id === puzzleData.puzzle.id) {
					return puzzleData.puzzle
				} else {
					return puzzle
				}
			})
			const borrowedPuzzle = puzzleData.puzzle
			borrowedPuzzle.due_date = puzzleData.borrow.due_date
			borrowedPuzzle.borrow_id = puzzleData.borrow.id
			this.setState({
				userPuzzles: [...this.state.userPuzzles, borrowedPuzzle],
				puzzles: updatedPuzzles
			})	
		})
	}

	handleReturn = (borrow_id) => {
		const configObj = {
			method: 'DELETE'
		}
		fetch(URL + `user_puzzles/${borrow_id}`, configObj)
		.then(res => res.json())
		.then((data)=> {
			const updatedUserPuzzles = this.state.userPuzzles.filter(puzzle => puzzle.borrow_id !== borrow_id)
			const updatedPuzzles = this.state.puzzles.map(puzzle => {
				if (puzzle.id === data.returned_puzzle_id) {
					puzzle.checked_out = false
					return puzzle
				} else {
					return puzzle
				}
			})
			this.setState({
				userPuzzles: updatedUserPuzzles,
				puzzles: updatedPuzzles
			})
		})
	}

	handleRenew = (borrow_id) => {
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		}
		fetch(URL + `user_puzzles/${borrow_id}`, configObj)
		.then(res => res.json())
		.then(borrowData => {
			const updatedUserPuzzles = this.state.userPuzzles.map(puzzle => {
				if (puzzle.id === borrowData.borrow.puzzle_id) {
					puzzle.due_date = borrowData.borrow.due_date
					return puzzle
				} else {
					return puzzle
				}
			})
			this.setState({
				userPuzzles: updatedUserPuzzles
			})
		})
	}

	deleteUser = (user) => {
		const configObj = {
			method: 'DELETE'
		}
		fetch(URL + `users/${user.id}`, configObj)
		.then(res => res.json())
		.then(()=> {
			const updatedPuzzles = this.state.puzzles.map(puzzle => {
				if (this.state.userPuzzles.find(up => puzzle.id === up.id)) {
					puzzle.checked_out = false
					return puzzle
				} else {
					return puzzle
				}
			})
			this.setState({
				currentUser: { name: 'no one' },
				userPuzzles: [],
				puzzles: updatedPuzzles
			})
		})

	}

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
						<Link to="/user">User</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/contribute">Donate a Puzzle</Link>
					</li>
				</ul>
				<header className="App-header">
					<h1>Puzzle Library</h1>
					<p>{this.state.currentUser.name} is currently logged in</p>
				</header>
				<Switch>
					<main>
						<Route
							exact
							path="/puzzles"
							render={() => (
								<PuzzleContainer
									puzzleData={this.state.puzzles}
									handleBorrow={this.handleBorrow}
									noOneLoggedIn={this.state.currentUser.name === 'no one'}
								/>
							)}
						/>
						<Route
							exact
							path="/user"
							render={() => (
								<UserContainer
									userData={this.state.currentUser}
									puzzles={this.state.userPuzzles}
									handleReturn={this.handleReturn}
									handleRenew={this.handleRenew}
									deleteUser={this.deleteUser}
									noOneLoggedIn={this.state.currentUser.name === 'no one'}
								/>
							)}
						/>
						<Route
							exact
							path="/login"	
							render={() => (
								<Login
								handleLogin={this.handleLogin}
								/>
							)}
						/>
						<Route
							exact
							path="/contribute"
							render={() => (
								<Contribute
									handleContribute={this.handleContribute}
								/>
							)}
						/>
					</main>
				</Switch>
			</Router>
		);
	}
}

export default withRouter(App);
