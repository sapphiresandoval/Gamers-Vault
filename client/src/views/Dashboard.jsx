import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Dashboard = (props) => {
    const {user, setUser} = useContext(userContext)
    console.log(user)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${user.id}`);
                setUser(response.data);  // Set the game state with fetched data
                console.log(user)
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchUser();
    }, [user.id])

    return (
        <div>
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'> {user.username}'s Lists</h2>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/backlog'}>Backlog List</Link>
                </h3>
                <p className='text-center'># of Games</p>
            </div>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/wish'}>Wish List</Link>
                </h3>
                <p className='text-center'># of Games</p>
            </div>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/completed'}>Completed List</Link>
                </h3>
                <p className='text-center'># of Games</p>
            </div>
        </div>
)}

export default Dashboard;