import React, { useState } from 'react';

const URL = 'http://localhost:3001/';

const ChangePassword = ({ setFormOpen, setPopupMessage, userId }) => {
    const token = localStorage.getItem("jwt")

	// controlled form for user details
	const [passwordForm, setpasswordForm] = useState({ oldPassword: '', newPassword: '', confirm: '' });
	const handleInupt = (e) => {
		setpasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
	};	
	// errors for when username or password are not correct
	const [errors, setErrors] = useState([])

	const changePassword = (passwordObj) => {
        const body = {
            password: passwordObj.oldPassword,
            new_password: passwordObj.newPassword
        }
		const configObj = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(body),
		};
		fetch(URL + 'users/' + userId, configObj)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                // console.log(data.error)
                setErrors([data.error])
            } else {
                // console.log(data)
                setPopupMessage(data.message)
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
        const noErrors = frontendErrorCheck()
        if (noErrors) {
            changePassword(passwordForm)
            // console.log(passwordForm)
        }
	};

	const renderErrors = (regex) => {
		if (errors) {
			const errorRegex = new RegExp(regex)
			const errMessage = errors.find(error => errorRegex.test(error))
			if (errMessage) {
				return <span className="error">{errMessage}</span>
			}
		}
		return null
	}

	return (
		<>
			<h2>Change Your Password:</h2>
			<form onSubmit={handleSubmit}>
				<label>Old Password:</label>
				<input
					type="password"
					name="oldPassword"
					placeholder="Enter your old password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.oldPassword}
					/>
				{renderErrors('correct')}
				<label>New Password:</label>
				<input
					type="password"
					name="newPassword"
					placeholder="Enter your new password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.newPassword}
					/>
				{renderErrors('capital')}
				{renderErrors('characters')}
				<label>Confirn New Password:</label>
				<input
					type="password"
					name="confirm"
					placeholder="Confirm your new password..."
					className="input-text"
					onChange={(e) => handleInupt(e)}
					value={passwordForm.confirm}
					/>
				{renderErrors('confirmation')}
				{renderErrors('sure')}
				<input
					className="btn"
					type="submit"
					name="submit"
					value="Submit"
				/>
			</form>

		</>
	);
}

export default ChangePassword;
