import React from "react";

const UserAccount = ({ deleteUser, userData }) => {

    return (
        <>
        	<React.Fragment>
                <h1>{userData.username}</h1>
                <button 
                    onClick={() => deleteUser(userData)}
                    className="delete-btn">
                    Delete Account
                </button>
			</React.Fragment>

        </>
    )
}

export default UserAccount