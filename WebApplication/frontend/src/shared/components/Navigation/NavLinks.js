import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLink.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/u1/scans">MY SCANS</NavLink>
        </li>
        <li>
            <NavLink to="/scans/new">NEW SCAN</NavLink>
        </li>
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
    </ul>
};

export default NavLinks;