import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { UserContext } from '../context/auth'
import './Navbar.css'

function Navbar() {

    const { user, logoutData } = useContext(UserContext)

    const logout = () => {
        logoutData()
    }

    return (
        <div className="navbar">
            <Link to="/" className="nav-link"><Button content='Home' primary /></Link>
            <div>
                {user.firstName === null ? 
                    <> 
                        <Link to="/login" className="nav-link"><Button content='Login' primary /></Link>
                        <Link to="/signup" className="nav-link"><Button content='SignUp' primary /></Link>
                    </> :
                    <>
                        <Link to="/Profile" className="nav-link"><Button content='Profle' primary /></Link>
                        <Link to="./login"><Button content='logout' primary onClick={logout} /></Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar
