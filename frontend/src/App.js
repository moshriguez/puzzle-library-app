import React, { useEffect, useState } from 'react';
import {
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
import UserTabs from "./components/UserTabs";
import Splash from './components/Splash'
import Modal from './components/Modal'
import Navbar from "./components/Navbar";

const URL = 'http://localhost:3001/';

const App = () => {
	const width = window.innerWidth 
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    const [windowWidth, setWindowWidth] = useState(width)


    useEffect(() => {
        window.addEventListener('resize', calculateWidth)
        return () => {window.removeEventListener('resize', calculateWidth)}
    }, [])

    const calculateWidth = () => {
        const newWidth = window.innerWidth 
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        setWindowWidth(newWidth)
    }

	const [currentUser, setCurrentUser] = useState({ username: 'no one', id: 0 });
	const [puzzles, setPuzzles] = useState([]);
	const [borrows, setBorrows] = useState([]);
	const [borrowHistory, setBorrowHistory] = useState([]);
	// Errors if user doesn't pass validations
	const [errors, setErrors] = useState([]);
	// popup message for user - to let user know when they reach renew/borrow limits
	const [popupMessage, setPopupMessage] = useState('')

	// Pass reference to useHistory hook
	const history = useHistory()
	
	const token = localStorage.getItem("jwt")

	useEffect(() => {
		fetch(URL + 'puzzles')
		.then((res) => res.json())
		.then((puzzleData) => {
			// console.log(puzzleData)
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
					// console.log(data)
					setCurrentUser(data.user)
					setBorrowsAndHistory(data.user.borrows)
				}
			})
		}
	}, [token, history])
		
	const setBorrowsAndHistory = (borrowArr) => {
		const borrows = borrowArr.filter(borrow => borrow.active)
		setBorrows(borrows)
		const hist = borrowArr.filter(borrow => !borrow.active)
		setBorrowHistory(hist)
	}

	const handleLogout = () => {
		localStorage.clear();
		setCurrentUser({ username: 'no one', id: 0 })
		setBorrows([])
		history.push("/")
	};

	const handleBorrow = (puzzleId) => {
		if (borrows.length > 4) {
			setPopupMessage('A maximum of 5 puzzles are allowed to be borrowed at a time.')
		} else {
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
		}
	};

	const handleReturn = (borrow) => {
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		};
		fetch(URL + `return/${borrow.id}`, configObj)
			.then((res) => res.json())
			.then((data) => {
				const updatedBorrows = borrows.filter(
					(b) => b.id !== borrow.id
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
				setBorrowHistory([...borrowHistory, borrow])
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
			.then((data) => {
				if (data.error) {
					// console.log(data.error)
					setPopupMessage(data.error)	
				} else {
					// console.log(data)
					const updatedBorrows = borrows.map(
						(borrow) => {
							if (borrow.id === data.borrow.id) {
								borrow.due_date = data.borrow.due_date;
								return borrow;
							} else {
								return borrow;
							}
						}
					);
					setBorrows(updatedBorrows)
				}
			})
	};

	const deleteUser = (user) => {
		// console.log(user)
		// console.log(token)
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
						borrows.find((up) => puzzle.id === up.puzzle_id)
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
				setBorrowHistory([])
				setPuzzles(updatedPuzzles)
				history.push("/")
			});
	};

	return (
		<>
			<Navbar currentUser={currentUser} handleLogout={handleLogout}/>
			<header className="App-header">
				<div className="title">
					<i className="fas fa-puzzle-piece"></i>
					<h1>PuzzleTheque</h1>
					<i className="fas fa-puzzle-piece"></i>
				</div>
				<p>{currentUser.username} is currently logged in</p>
			</header>
			<main>
				{popupMessage.length ? <Modal popupMessage={popupMessage} setPopupMessage={setPopupMessage}/> : null}
				<Switch>
					<Route exact path="/" render={() => <Splash />} />
					<Route exact path="/puzzles">
						<PuzzleContainer
							windowWidth={windowWidth}
							puzzleData={puzzles}
							handleBorrow={handleBorrow}
							userData={currentUser}
						/>
					</Route>
					<Route exact path="/user">
						<UserTabs
							userData={currentUser}
							borrows={borrows}
							handleReturn={handleReturn}
							handleRenew={handleRenew}
							deleteUser={deleteUser}
							setErrors={setErrors}
							errors={errors}
							setPopupMessage={setPopupMessage}
						/>
					</Route>
					<Route exact path="/login">
						<Login  
							errors={errors} 
							setErrors={setErrors}
							setCurrentUser={setCurrentUser}
							setBorrowsAndHistory={setBorrowsAndHistory}
							/>
					</Route>
					<Route exact path="/signup">
						<Signup 
							errors={errors} 
							setErrors={setErrors}
							setCurrentUser={setCurrentUser}
						/>
					</Route>
					<Route exact path="/contribute">
						<Contribute
							puzzles={puzzles}
							setPuzzles={setPuzzles}
						/>
					</Route>
				</Switch>
			</main>
		</>
	);
}

export default withRouter(App);
