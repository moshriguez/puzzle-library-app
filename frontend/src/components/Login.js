import React from 'react';

const Login = (props) => {
	return (
		<div id="login">
			<form onSubmit={props.handleLogin}>
			    <h3>Enter your username:</h3>
				<input
					type="text"
					name="name"
					placeholder="Enter your username..."
					className="input-text"
				/>
				<br />
				<input
					type="submit"
					name="submit"
					value="Login"
					className="submit"
				/>
			</form>
		</div>
	);
};

export default Login;
