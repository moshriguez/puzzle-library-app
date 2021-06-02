import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

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
			.then(userData => this.setState({
				currentUser: userData.user,
				userPuzzles: userData.puzzles
			}));

		// want to redirect to /user after 'logging in'
		// window.location.href = '/user'
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
			);
		// want to redirect to /puzzles after adding
		window.location.href = '/puzzles';
	};

	handleBorrow = (puzzleId) => {
		console.dir(`userID: ${this.state.currentUser.id} puzzleId: ${puzzleId}`)
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
			this.setState({
				userPuzzles: [...this.state.userPuzzles, puzzleData.puzzle],
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

export default App;
