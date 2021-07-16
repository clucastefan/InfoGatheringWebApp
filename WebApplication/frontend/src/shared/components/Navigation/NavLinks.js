import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLink.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return ( <ul className="nav-links">
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/utilizator1/myscans">MY SCANS</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/myscans/new">NEW SCAN</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>
        )}
    </ul> );
};

export default NavLinks;