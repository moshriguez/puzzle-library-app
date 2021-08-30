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

const URL = 'http://localhost:3001/';

class App extends React.Component {
	state = {
		currentUser: { name: 'no one', id: 0 },
		borrows: [],
		puzzles: [],
		errors: []
	};
	token = localStorage.getItem("jwt")

	componentDidMount() {
		fetch(URL + 'puzzles')
			.then((res) => res.json())
			.then((puzzleData) => {
				console.log(puzzleData)
				this.setState({
					puzzles: puzzleData.puzzles,
				});
			});
		if (this.token) {
			fetch(URL + 'profile', {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.token}`
				}
			})
			.then(r => r.json())
			.then(data => {
				if (data.message === 'Please log in') {
					// history.replace('/login')
				} else {
					console.log(data)
					this.setState({
						currentUser: data.user,
						borrows: this.filterBorrowData(data.user.borrows),
					})
				}
			})
		}
	}

	handleLogin = (userObj) => {
		const configObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		};
		fetch(URL + 'login', configObj)
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error)
					this.setState({
						error: data.error
					})
				} else {
					console.log(data)
					localStorage.setItem("jwt", data.jwt);
					this.setState({
						currentUser: data.user,
						borrows: this.filterBorrowData(data.user.borrows),
					});
				}
			});
		};
		
	filterBorrowData = (borrowArr) => {
		const borrows = borrowArr.filter(borrow => borrow.active)
		return borrows
	}

	handleLogout = () => {
		localStorage.clear();
		this.setState({
			currentUser: { name: 'no one', id: 0 },
			borrows: [],
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
		fetch(URL + 'borrows', configObj)
			.then((res) => res.json())
			.then((puzzleData) => {
				const updatedPuzzles = this.state.puzzles.map((puzzle) => {
					if (puzzle.id === puzzleData.puzzle.id) {
						return puzzleData.puzzle;
					} else {
						return puzzle;
					}
				});
				this.setState({
					borrows: [...this.state.borrows, puzzleData.borrow],
					puzzles: updatedPuzzles,
				});
			});
	};

	handleReturn = (borrow_id) => {
		const configObj = {
			method: 'DELETE',
		};
		fetch(URL + `borrows/${borrow_id}`, configObj)
			.then((res) => res.json())
			.then((data) => {
				const updatedBorrows = this.state.borrows.filter(
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
					borrows: updatedBorrows,
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
		fetch(URL + `borrows/${borrow_id}`, configObj)
			.then((res) => res.json())
			.then((borrowData) => {
				console.log(borrowData)
				const updatedBorrows = this.state.borrows.map(
					(borrow) => {
						if (borrow.id === borrowData.borrow.id) {
							borrow.due_date = borrowData.borrow.due_date;
							return borrow;
						} else {
							return borrow;
						}
					}
				);
				this.setState({
					borrows: updatedBorrows,
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
						this.state.borrows.find((up) => puzzle.id === up.id)
					) {
						puzzle.checked_out = false;
						return puzzle;
					} else {
						return puzzle;
					}
				});
				this.setState({
					currentUser: { name: 'no one', id: 0 },
					borrows: [],
					puzzles: updatedPuzzles,
				});
			});
	};

	render() {
		return (
			<Router>
				<ul className="navbar">
					<li>
						<i className="fas fa-puzzle-piece"></i>
					</li>
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
					
					<h1>PuzzleTheque</h1>
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
								borrows={this.state.borrows}
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
