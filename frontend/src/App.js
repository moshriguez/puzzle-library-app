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
		users: [],
	};

	componentDidMount() {
		fetch(URL + 'puzzles')
			.then((res) => res.json())
			.then((puzzleData) => {
				this.setState({
					puzzles: puzzleData.puzzles,
				});
			});
		fetch(URL + 'user')
			.then((res) => res.json())
			.then((userData) => {
				this.setState({
					users: userData.users,
				});
			});
	}

	handleLogin = (userObj) => {
		// FETCH HAS CORS ERRORS??
		// const configObj = {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(userObj),
		// };
		// fetch(URL + 'users', configObj)
		// 	.then((res) => res.json())
		// 	.then(console.log);

		this.setState({
			currentUser: userObj,
		});
		// want to redirect to /user after 'logging in'
		// window.location.href = '/user'
	};

	createUser = (userObj) => {};

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
								/>
							)}
						/>
						<Route
							exact
							path="/user"
							render={() => (
								<UserContainer
									userData={this.state.currentUser}
								/>
							)}
						/>
						<Route
							exact
							path="/login"	
							render={() => (
								<Login
								handleLogin={this.handleLogin}
								users={this.state.users}
								createUser={this.createUser}
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
