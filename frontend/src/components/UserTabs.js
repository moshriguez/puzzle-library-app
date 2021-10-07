import { useState } from "react";

import UserAccount from "./UserAccount";
import UserHistory from "./UserHistory";
import UserPuzzleContainer from "./UserPuzzleContainer";

const UserTabs = ({ borrows, handleReturn, handleRenew, deleteUser, userData }) => {
    const [activeTab, setActiveTab] = useState('puzzles')

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <UserAccount 
                        userData={userData}
                        deleteUser={deleteUser}
                    />)
            case 'puzzles':
                return (
                    <UserPuzzleContainer 
                        borrows={borrows}
                        handleRenew={handleRenew}
                        handleReturn={handleReturn}
                    />)
            case 'history':
                return <UserHistory />
            default:
                return (
                    <UserPuzzleContainer 
                        borrows={borrows}
                        handleRenew={handleRenew}
                        handleReturn={handleReturn}
                    />)
        }
    }

    return (
        <div className="tabs">
            <ul className="user-tabs-nav">
                <li>Puzzles</li>
                <li>History</li>
                <li>Account</li>
            </ul>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    )

}

export default UserTabs