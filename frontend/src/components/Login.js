import React, { useState } from 'react';

const Login = ({ errors, handleLogin }) => {
	// controlled form for user details
	const [userForm, setuserForm] = useState({ name: '', password: '' });
	const handleInupt = (e) => {
		setuserForm({ ...userForm, [e.target.name]: e.target.value });
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(userForm)
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
					name="name"
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
