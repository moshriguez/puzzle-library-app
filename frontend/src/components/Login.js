import React, { useState } from 'react';
import { useHistory } from 'react-router';

const URL = 'http://localhost:3001/';

const Login = ({ errors, setErrors, setBorrows, setCurrentUser, filterBorrowData }) => {
	// controlled form for user details
	const [userForm, setuserForm] = useState({ username: '', password: '' });
	const handleInupt = (e) => {
		setuserForm({ ...userForm, [e.target.name]: e.target.value });
	};

	const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(userForm)
	};

	const handleLogin = (userObj) => {
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
					setErrors(data.error)
				} else {
					console.log(data)
					localStorage.setItem("jwt", data.jwt);
					setCurrentUser(data.user)
					setBorrows(filterBorrowData(data.user.borrows))
					history.push("/user")
				}
			});
		};


	const renderErrors = (regex) => {
		if (errors) {
			const errorRegex = new RegExp(regex)
			if (errorRegex.test(errors)) {
				return <span>{errors}</span>
			}
		}
		return null
	}

	return (
		<div id="login">
			<form onSubmit={handleSubmit}>
				<h3>Enter your username:</h3>
				<input
					type="text"
					name="username"
					placeholder="Enter your username..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={userForm.name}
				/>
				<br />
				{renderErrors('username')}
				<input
					type="password"
					name="password"
					placeholder="Enter your password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={userForm.password}
					/>
				<br />
				{renderErrors('password')}
				<input
					className="btn"
					type="submit"
					name="submit"
					value="Login"
				/>
			</form>
			<p>Don't have an account?</p>
			<a href="/signup">Sign up</a>

		</div>
	);
}

export default Login;
