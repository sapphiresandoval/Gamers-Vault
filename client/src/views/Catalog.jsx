import React, {useContext, useEffect, useState} from 'react';
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const Catalog = (props) => {
    const {allGames, setAllGames} = useContext(userContext)
    const {user, setUser} = useContext(userContext)
    
    useEffect(() => {
        //axios.get()
            // .then( set all Games)
    },[])
    //We also need to add a map function for table

    return (
        <div className="overflow-x-auto m-3">
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'>Game Catalog</h2>
            <div className='flex justify-center'>
                <button className="rounded hover:outline-purple-500 p-2 hover:bg-purple-500 hover:text-black">
                    <Link to={'/game/create'}>Add A Game</Link>
                </button>
            </div>
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
                            <Link to={`/game/GAMEID`} className="rounded hover:outline-purple-500 p-2 hover:bg-purple-800 hover:text-white mr-2">View</Link>
                            
                        {/* if added by user can update  */}
                            <Link to={`/game/update/GAMEID`} className="rounded hover:outline-purple-500 p-2 hover:bg-purple-800 hover:text-white mr-2">Update</Link>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
)}

export default Catalog;