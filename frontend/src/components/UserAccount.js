import { useState } from "react";

import ChangePassword from "./ChangePassword";

const UserAccount = ({ deleteUser, setPopupMessage, userData }) => {
    const [formOpen, setFormOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleClick = () => {
        setFormOpen(true)
    }

    const handleDelete = () => {
        setDeleteConfirm(true)
    }

    return (
        <>
            {deleteConfirm ? 
                (
                    <div className="modal-background">
                        <div className="modal-content">
                            <p>Are you sure you would like to delete your account?</p>
                            <div className="btn-grp-row">
                                <button onClick={() => deleteUser(userData)} >Yes</button>
                                <button onClick={() => setDeleteConfirm(false)} >No</button>
                            </div>
                        </div>
                    </div>
                ) : null}
            {formOpen ? 
                <ChangePassword 
                userId={userData.id}
                setFormOpen={setFormOpen} 
                setPopupMessage={setPopupMessage}
                /> : (
                <>
                    <h1>{userData.username}</h1>
                    <button className="btn" onClick={handleClick}>Change Password</button>
                    <button 
                        onClick={handleDelete}
                        className="delete-btn">
                        Delete Account
                    </button>
                </>
            )}
        </>
    )
}

export default UserAccount