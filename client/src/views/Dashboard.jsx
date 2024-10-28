import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    return (
        <div>
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'> User's Lists</h2>
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