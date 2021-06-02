import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Contribute from './components/Contribute';
import PuzzleContainer from './components/PuzzleContainer';

const URL = 'http://localhost:9393/';

class App extends React.Component {
	state = {
		user: 'defaultUser',
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

	loginComponent = () => <Login handleLogin={this.handleLogin}/>

	handleLogin = (userObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userObj)
		}
		fetch(URL + 'users', configObj)
		.then((res) => res.json())
		.then(console.log)
		// this.setState({
		// 	user: e.target.name.value,
		// });
	};

	handleContribute = (puzzleObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(puzzleObj)
		}
		fetch(URL + 'puzzles', configObj)
		.then((res) => res.json())
		.then(data => this.setState({puzzles: [...this.state.puzzles, data.puzzle]}))
		return <Redirect to="/puzzles" />
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Puzzle Library</h1>
					<Router>
						<ul>
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
						<Switch>
							<Route
								exact
								path="/puzzles"
								render={() => (
									<PuzzleContainer
										puzzleData={this.state.puzzles}
									/>
								)}
							/>
							<Route exact path="/login" component={this.loginComponent} />
							<Route exact path="/contribute" render={() => (
									<Contribute	handleContribute={this.handleContribute}/>
								)} />
						</Switch>
					</Router>
				</header>
				<main></main>
			</div>
		);
	}
}

export default App;
