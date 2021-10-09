import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, handleLogout }) => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <nav>
            <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
            <ul className="navbar">
                <li>
                    <i className="fas fa-puzzle-piece"></i>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/puzzles">Puzzles</Link>
                </li>
                <li>
                    {currentUser.id === 0 ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <Link to="/user">User</Link>
                    )}
                </li>
                <li>
                    <Link to="/contribute">Donate a Puzzle</Link>
                </li>
                {currentUser.id === 0 ? null : (
                    <li onClick={handleLogout}>
                        <button>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar