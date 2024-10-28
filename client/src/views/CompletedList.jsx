import React, {useContext, useState} from 'react';
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const CompletedList = (props) => {
    const {allGames, setAllGames} = useContext(userContext)
    const {user, setUser} = useContext(userContext)
    

    // filter all games to users games then to specific list.

    return (
        <div className="overflow-x-auto m-3">
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'>Users Completed List</h2>
            <table className="table mt-2">
                <thead>
                    <tr className='text-lg text-purple-500'>
                        <th >Name</th>
                        <th>Genre</th>
                        <th>Platform</th>
                        <th>How its Owned</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* MAP GOES HERE */}
                    <tr className='hover:bg-purple-400 hover:text-black duration-300 ease-in-out'>
                        <td>
                            <Link to={'/game'}>Game Name</Link>
                        </td>
                        <td>Horror</td>
                        <td>Steam</td>
                        <td>Digital</td>
                        <td>
                            <button>
                                <Link to={`/game/update/GAMEID`}>Update</Link>
                            </button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
)}

export default CompletedList;