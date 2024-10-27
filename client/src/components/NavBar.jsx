import React, {useContext, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { userContext } from '../context/userContext';
import axios from 'axios';

const NavBar = (props) => {
    // const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()

    const location = useLocation()

    const logoutUser = () => {
        // axios.post('', JSON.stringify(user),{ headers: { 'Content-Type': 'application/json' } })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    if(location.pathname == '/' || location.pathname == '/register'){
        return (
            <nav className='navbar bg-base-100 justify-center'>
                <h1 className='font-bold text-3xl text-purple-600' >Gamers Vault</h1>
            </nav>
        )
    }

    return (
        <nav className='navbar bg-base-100'>
            <div className="flex-1">
                <h1 className='font-bold text-3xl text-purple-600' >Gamers Vault</h1>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 ">
                    <li>
                        <Link to={'/games/list'}>Home</Link>
                    </li>
                    <li>
                        <Link to={`/game/create`}>Add Game</Link>
                    </li>
                    <li>
                        <p className='' onClick={logoutUser}>Logout</p>
                    </li>
                </ul>
            </div>
        </nav>
)}

export default NavBar;