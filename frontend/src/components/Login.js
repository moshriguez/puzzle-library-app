import React from 'react';

class Login extends React.Component {
	state = {
		username: ''
	}

	handleInupt = (e) => {
		this.setState({
			username: e.target.value
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const userObj = {name: this.state.username}
		this.props.handleLogin(userObj)
		this.setState({
			username: ''
		})
	}
	
	render() {

		return (
			<div id="login">
				<form onSubmit={this.handleSubmit}>
					<h3>Enter your username:</h3>
					<input
						type="text"
						name="name"
						placeholder="Enter your username..."
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.username}
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
	}
};

export default Login;