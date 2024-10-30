import React, {useContext, useState, useEffect} from 'react';
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from 'axios'


const WishList = (props) => {
    const {allGames, setAllGames} = useContext(userContext)
    const {user, setUser} = useContext(userContext)
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/games')
        .then( res => setAllGames(res.data))
        .catch(err => console.log(err))
    },[user.id])

    //We also need to add a map function for table

    // filter all games to users games then to specific list.

    return (
        <div className="overflow-x-auto m-3">
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'>{user.username}'s Wish List</h2>
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
                            <Link to={'/game/gameId'}>Game Name</Link>
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

export default WishList;