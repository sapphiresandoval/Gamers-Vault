import React, { useContext, useEffect } from 'react';
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Catalog = (props) => {
    const { allGames, setAllGames } = useContext(userContext);
    const { user } = useContext(userContext);
    console.log(user.id)
    console.log(user)
    console.log(allGames)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/games', {
                    // headers: { 'Content-Type': 'application/json' }
                });
                setAllGames(response.data);
                console.log("GAMES:", response.data)
            } catch (err) {
                console.log('Error fetching games:', err);
            }
        };

        if (user.id) { // Only fetch games if user ID is available
            fetchGames();
        }
    }, [user.id, setAllGames]); // Adding user.id as a dependency

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
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allGames.map(game => (
                        <tr className='hover:bg-purple-400 hover:text-black duration-300 ease-in-out' key={game.id}>
                            <td>
                                <Link to={`/game/${game.id}`}>{game.name}</Link>
                            </td>
                            <td>{game.genre}</td>
                            <td>
                                <Link to={`/game/${game.id}`} className="rounded hover:outline-purple-500 p-2 hover:bg-purple-800 hover:text-white mr-2">View</Link>
                                <Link to={`/game/update/${game.id}`} className="rounded hover:outline-purple-500 p-2 hover:bg-purple-800 hover:text-white mr-2">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Catalog;
