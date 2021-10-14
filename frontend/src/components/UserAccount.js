import { useState } from "react";

import ChangePassword from "./ChangePassword";

const UserAccount = ({ deleteUser, errors, setErrors, setPopupMessage, userData }) => {
    const [formOpen, setFormOpen] = useState(false)

    const handleClick = () => {
        setFormOpen(true)
    }

    return (
        <>
            {formOpen ? 
                <ChangePassword 
                userId={userData.id}
                setFormOpen={setFormOpen} 
                setErrors={setErrors} 
                errors={errors}
                setPopupMessage={setPopupMessage}
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