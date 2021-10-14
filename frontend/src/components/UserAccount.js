import { useState } from "react";
import { Link } from "react-router-dom";

import ChangePassword from "./ChangePassword";

const UserAccount = ({ deleteUser, errors, setErrors, userData }) => {
    const [formOpen, setFormOpen] = useState(false)

    const handleClick = () => {
        setFormOpen(true)
    }

    return (
        <>
            {formOpen ? 
                <ChangePassword 
                setFormOpen={setFormOpen} 
                setErrors={setErrors} 
                errors={errors}
                /> : (
                <>
                    <h1>{userData.username}</h1>
                    <button className="btn" onClick={handleClick}>Change Password</button>
                    <button 
                        onClick={() => deleteUser(userData)}
                        className="delete-btn">
                        Delete Account
                    </button>
                </>
            )}
        </>
    )
}

export default UserAccount