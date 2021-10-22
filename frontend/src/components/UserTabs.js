import { useState } from "react";

import UserAccount from "./UserAccount";
import UserHistory from "./UserHistory";
import UserPuzzleContainer from "./UserPuzzleContainer";

const UserTabs = ({ borrows, borrowHistory, handleReturn, handleRenew, deleteUser, setPopupMessage, windowWidth, userData }) => {
    const noOneLoggedIn = userData.id === 0
    const [activeTab, setActiveTab] = useState('puzzles')

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <UserAccount 
                        userData={userData}
                        deleteUser={deleteUser}
                        setPopupMessage={setPopupMessage}
                    />)
            case 'puzzles':
                return (
                    <UserPuzzleContainer 
                        borrows={borrows}
                        handleRenew={handleRenew}
                        handleReturn={handleReturn}
                    />)
            case 'history':
                return (
                    <UserHistory 
                        borrowHistory={borrowHistory}
                        windowWidth={windowWidth}
                    />)
            default:
                return (
                    <UserPuzzleContainer 
                        borrows={borrows}
                        handleRenew={handleRenew}
                        handleReturn={handleReturn}
                    />)
        }
    }

    const handleClick = (str) => {
        setActiveTab(str)
    }

    return (
        <div className="flex-container">
            {noOneLoggedIn ? (
				<h3>
					Login or create an account to see your borrowed puzzles here.
				</h3>
			) : (
                <>
                    <ul className="user-tabs-nav">
                        <li className={activeTab === "puzzles" ? "active" : ""} onClick={()=> handleClick('puzzles')}>Puzzles</li>
                        <li className={activeTab === "history" ? "active" : ""} onClick={()=> handleClick('history')}>History</li>
                        <li className={activeTab === "account" ? "active" : ""} onClick={()=> handleClick('account')}>Account</li>
                    </ul>
                    <div className="tab-content">
                        {renderTabContent()}
                    </div>
                </>
            )}
        </div>
    )

}

export default UserTabs