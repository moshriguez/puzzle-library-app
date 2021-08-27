import React from 'react';
import {withRouter} from 'react-router-dom';


class Login extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleInupt = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const userObj = { name: this.state.username, password: this.state.password };
		this.props.handleLogin(userObj)
		this.props.history.push("/user")
	};

	render() {
		return (
			<div id="login">
				<form onSubmit={this.handleSubmit}>
					<h3>Enter your username:</h3>
					<input
						type="text"
						name="username"
						placeholder="Enter your username..."
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.username}
					/>
					<br />
					<input
						type="password"
						name="password"
						placeholder="Enter your password..."
						className="input-text"
						onChange={(e) => this.handleInupt(e)}
						value={this.state.password}
					/>
					<br />
					<input
						className="btn"
						type="submit"
						name="submit"
						value="Login"
					/>
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
