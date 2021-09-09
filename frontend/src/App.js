import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
	useHistory,
	withRouter
} from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import Contribute from './components/Contribute';
import PuzzleContainer from './components/PuzzleContainer';
import UserContainer from './components/UserContainer';
import Splash from './components/Splash'

const URL = 'http://localhost:3001/';

const App = () => {
	const [currentUser, setCurrentUser] = useState({ username: 'no one', id: 0 });
	const [puzzles, setPuzzles] = useState([]);
	const [borrows, setBorrows] = useState([]);
	// Errors if user doesn't pass validations
	const [errors, setErrors] = useState([]);

	// Pass reference to useHistory hook
	const history = useHistory()
	
	const token = localStorage.getItem("jwt")

	useEffect(() => {
		fetch(URL + 'puzzles')
		.then((res) => res.json())
		.then((puzzleData) => {
			console.log(puzzleData)
			setPuzzles(puzzleData.puzzles)
		});
	}, [])

	useEffect(() => {
		if (token) {
			fetch(URL + 'profile', {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
			.then(r => r.json())
			.then(data => {
				if (data.message === 'Please log in') {
					history.replace('/login')
				} else {
					console.log(data)
					setCurrentUser(data.user)
					setBorrows(filterBorrowData(data.user.borrows))
				}
			})
		}
	}, [token, history])
		
	const filterBorrowData = (borrowArr) => {
		const borrows = borrowArr.filter(borrow => borrow.active)
		return borrows
	}

	const handleLogout = () => {
		localStorage.clear();
		setCurrentUser({ username: 'no one', id: 0 })
		setBorrows([])
		history.push("/")
	};

	const handleContribute = (puzzleObj) => {
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
				setPuzzles([...puzzles, data.puzzle])
			)
	};

	const handleBorrow = (puzzleId) => {
		const body = {
			puzzle_id: puzzleId,
			user_id: currentUser.id,
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
				const updatedPuzzles = puzzles.map((puzzle) => {
					if (puzzle.id === puzzleData.puzzle.id) {
						return puzzleData.puzzle;
					} else {
						return puzzle;
					}
				});
				setPuzzles(updatedPuzzles)
				setBorrows([...borrows, puzzleData.borrow])
			});
	};

	const handleReturn = (borrow_id) => {
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		};
		fetch(URL + `return/${borrow_id}`, configObj)
			.then((res) => res.json())
			.then((data) => {
				const updatedBorrows = borrows.filter(
					(borrow) => borrow.id !== borrow_id
				);
				const updatedPuzzles = puzzles.map((puzzle) => {
					if (puzzle.id === data.puzzle.id) {
						puzzle.checked_out = false;
						return puzzle;
					} else {
						return puzzle;
					}
				});
				setBorrows(updatedBorrows)
				setPuzzles(updatedPuzzles)
			});
	};

	const handleRenew = (borrow_id) => {
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
				const updatedBorrows = borrows.map(
					(borrow) => {
						if (borrow.id === borrowData.borrow.id) {
							borrow.due_date = borrowData.borrow.due_date;
							return borrow;
						} else {
							return borrow;
						}
					}
				);
				setBorrows(updatedBorrows)
			});
	};

	const deleteUser = (user) => {
		console.log(user)
		console.log(token)
		const configObj = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
		fetch(URL + `users/${user.id}`, configObj)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				const updatedPuzzles = puzzles.map((puzzle) => {
					if (
						borrows.find((up) => puzzle.id === up.id)
					) {
						puzzle.checked_out = false;
						return puzzle;
					} else {
						return puzzle;
					}
				});
				localStorage.clear()
				setCurrentUser({ username: 'no one', id: 0 })
				setBorrows([])
				setPuzzles(updatedPuzzles)
			});
	};

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
					{currentUser.id === 0 ? (
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
				{currentUser.id === 0 ? null : (
					<button id="logout-btn" onClick={handleLogout}>
						Logout
					</button>
				)}
				<p>{currentUser.username} is currently logged in</p>
			</header>
			<Switch>
				<main>
					<img
					src="https://marketingtechnews.net/wp-content/uploads/sites/6/2021/02/sigmund-B-x4VaIriRc-unsplash.jpg"
					alt="close up of a puzzle"
					/>

					<Route exact path="/" render={() => <Splash />} />
						{/* <Splash />
					</Route> */}
					<Route exact path="/puzzles">
						<PuzzleContainer
							puzzleData={puzzles}
							handleBorrow={handleBorrow}
							noOneLoggedIn={
								currentUser.id === 0
							}
						/>
					</Route>
					<Route exact path="/user">
						<UserContainer
							userData={currentUser}
							borrows={borrows}
							handleReturn={handleReturn}
							handleRenew={handleRenew}
							deleteUser={deleteUser}
							noOneLoggedIn={
								currentUser.id === 0
							}
						/>
					</Route>
					<Route exact path="/login">
						<Login  
							errors={errors} 
							setErrors={setErrors}
							setBorrows={setBorrows} 
							setCurrentUser={setCurrentUser}
							filterBorrowData={filterBorrowData}
							/>
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/contribute">
						<Contribute
							handleContribute={handleContribute}
						/>
					</Route>
				</main>
			</Switch>
		</Router>
	);
}

export default withRouter(App);
