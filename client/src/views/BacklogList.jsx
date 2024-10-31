import React, {useContext, useState, useEffect} from 'react';
import { userContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const BacklogList = (props) => {
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const { collection, setCollection } = useContext(userContext);
    const { allGames, setAllGames } = useContext(userContext);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRes = await axios.get('http://localhost:5000/api/collections');
                setCollection(collectionRes.data);
                
                const allGamesRes = await axios.get('http://localhost:5000/api/games');
                setAllGames(allGamesRes.data);
            } catch (error) {
                console.log(error);
                setError('Error fetching data');
            }
        };

        fetchData();
    }, [user.id, setAllGames, setCollection]);

    const deleteBacklog = (collectionId) => {
        axios.delete(`http://localhost:5000/api/collections/delete/${collectionId}`)
            .then(() => {
                // Update the local state to remove the item from the collection
                setCollection(prev => prev.filter(item => item.id !== collectionId));
            })
            .catch(err => {
                console.log(err);
                setError('Error deleting item');
            });
            navigate('/games/list')
    };

    const backLogItems = collection
        .filter(item => item.collection_name === 'backlog' && item.user_id === user.id)
        .map(item => item.game_id);

    const backLogGames = allGames.filter(game => backLogItems.includes(game.id));

    return (
        <div className="overflow-x-auto m-3">
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'>{user.username}'s Backlog</h2>
            <table className="table mt-2">
                <thead>
                    <tr className='text-lg text-purple-500'>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {backLogGames.length > 0 ? (
                        backLogGames.map(game => {
                            // Find the corresponding collection item for the game
                            const collectionItem = collection.find(item => item.game_id === game.id && item.collection_name === 'backlog');
                            
                            return (
                                <tr key={game.id} className='hover:bg-purple-400 hover:text-black duration-300 ease-in-out'>
                                    <td>
                                        <Link to={`/game/${game.id}`}>{game.name}</Link>
                                    </td>
                                    <td>{game.genre}</td>
                                    <td>
                                        <button>
                                            <Link to={`/game/update/${game.id}`}>Update</Link>
                                        </button>
                                        <button onClick={() => deleteBacklog(collectionItem.id)}> Remove</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No games in your wish list.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BacklogList;