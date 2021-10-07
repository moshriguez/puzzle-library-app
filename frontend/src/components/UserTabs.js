import { useState } from "react";

import UserAccount from "./UserAccount";
import UserHistory from "./UserHistory";
import UserPuzzleContainer from "./UserPuzzleContainer";

const UserTabs = () => {
    const [activeTab, setActiveTab] = useState('puzzles')

    return (
        <div className="tabs">
            <ul className="user-tabs-nav">
                <li>Puzzles</li>
                <li>History</li>
                <li>Account</li>
            </ul>
            <div className="tab-content">

            </div>
        </div>
    )

}

export default UserTabs