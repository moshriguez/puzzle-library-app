import React, { useState } from 'react';

const URL = 'http://localhost:3001/';

const ChangePassword = ({ errors, setErrors, setFormOpen }) => {
	// controlled form for user details
	const [passwordForm, setpasswordForm] = useState({ oldPassword: '', newPassword: '', confirm: '' });
	const handleInupt = (e) => {
		setpasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
	};	

	const changePassword = (passwordObj) => {
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(passwordObj),
		};
		fetch(URL + 'users', configObj)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                console.log(data.error)
                setErrors(data.error)
            } else {
                console.log(data)
                setFormOpen(false)
            }
        });
	};

    // checks for errors on the front end
    const frontendErrorCheck = () => {
        const newErrors = [];
        if (passwordForm.newPassword !== passwordForm.confirm) {
            newErrors.push('The password you have entered does not match the password confirmation')
        }
        if (passwordForm.oldPassword === passwordForm.newPassword) {
            newErrors.push('Your new password matches your old password. Are you sure you want to change your password?')
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/
        if (!passwordRegex.test(passwordForm.newPassword)) {
            newErrors.push('Passwords must include a capital letter, a lowercase letter and a number.')
        }
        setErrors(newErrors)
        //returns true for 0 errors
        return !newErrors.length
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        const errors = frontendErrorCheck()
        if (errors) {
        //  changePassword(passwordForm)
            console.log(passwordForm)
            setFormOpen(false)
        }
	};

	const renderErrors = (regex) => {
		if (errors) {
			const errorRegex = new RegExp(regex)
			if (errorRegex.test(errors)) {
				return <span>{errors.filter(error => errorRegex.test(error) )}</span>
			}
		}
		return null
	}

	return (
		<div className="flex-container">
			<h2>Change Your Password:</h2>
			<form onSubmit={handleSubmit}>
				<label>Old Password:</label>
				<input
					type="text"
					name="oldPassword"
					placeholder="Enter your Old Password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.oldPassword}
					/>
				<br />
				{renderErrors('hello')}
				<label>New Password:</label>
				<input
					type="password"
					name="newPassword"
					placeholder="Enter your new password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.newPassword}
					/>
				<br />
				{renderErrors('capital')}
				<label>Confirn New Password:</label>
				<input
					type="password"
					name="confirm"
					placeholder="Confirm your new password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.confirm}
					/>
				<br />
				{renderErrors('confirmation')}
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

export default ChangePassword;
