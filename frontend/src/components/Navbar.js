import { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = ({ currentUser, handleLogout }) => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <nav>
            <button onClick={handleToggle}>{navbarOpen ? <MdClose /> : <FiMenu />}</button>
            <ul className={`navbar${navbarOpen ? " show-menu" : ""}`}>
                <li>
                    <Link to="/" onClick={handleToggle}>Home</Link>
                </li>
                <li>
                    <Link to="/puzzles" onClick={handleToggle}>Puzzles</Link>
                </li>
                <li>
                    {currentUser.id === 0 ? (
                        <Link to="/login" onClick={handleToggle}>Login</Link>
                    ) : (
                        <Link to="/user" onClick={handleToggle}>User</Link>
                    )}
                </li>
                <li>
                    <Link to="/contribute" onClick={handleToggle}>Donate a Puzzle</Link>
                </li>
                {currentUser.id === 0 ? null : (
                    <li onClick={() => {handleLogout(); handleToggle();}}>
                        <button>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar