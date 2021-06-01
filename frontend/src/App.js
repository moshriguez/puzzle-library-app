import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import PuzzleContainer from './components/PuzzleContainer';

const URL = 'http://localhost:9393/'

class App extends React.Component {
	state = {
		user: 'defaultUser',
		puzzles: [],
	};

  componentDidMount(){
    fetch(URL + 'puzzles')
    .then(res => res.json())
    .then(puzzleData => {
      this.setState({
        puzzles: puzzleData.puzzles
      })
    })
  }

	handleLogin = (e) => {
		e.preventDefault();
		this.setState({
			user: e.target.name.value,
		});
	};

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
						</ul>
						<Switch>
							<Route exact path="/puzzles" render={() => <PuzzleContainer puzzleData={this.state.puzzles} />} />
							<Route exact path="/login" render={Login} />
						</Switch>
					</Router>
				</header>
				<main>
				</main>
			</div>
		);
	}
}

export default App;
