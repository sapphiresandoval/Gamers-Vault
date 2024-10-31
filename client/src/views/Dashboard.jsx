import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Dashboard = (props) => {
    const {user, setUser} = useContext(userContext)
    const {collection, setCollection} = useContext(userContext)
    const {allGames, setAllGames} = useContext(userContext)
    const [backlogCount, setBacklogCount] = useState('');
    const [wishCount, setWishCount] = useState('');
    const [completedCount, setCompletedCount] = useState('');
    console.log(user)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${user.id}`);
                setUser(response.data);  // Set the game state with fetched data

                const collectionRes = await axios.get('http://localhost:5000/api/collections')
                setCollection(collectionRes.data)

                const allGamesRes = await axios.get('http://localhost:5000/api/games')
                setAllGames(allGamesRes.data)

            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };
        console.log("ALL GAMES:", allGames)
        console.log("COLLECTIONS:", collection)
        
        fetchUser();
    }, [user.id, setAllGames, setCollection]
)
    const backLogItems = collection.filter(item => item.collection_name === 'backlog' && item.user_id === user.id).map(item => item.game_id)
    console.log("BACKLOG ITEMS:",backLogItems)
    const backLogGames = allGames.filter(game => backLogItems.includes(game.id)).length

    const wishListItems = collection.filter(item => item.collection_name === 'wish' && item.user_id === user.id).map(item => item.game_id)
    console.log("WISH ITEMS:",wishListItems)
    const wishListGames = allGames.filter(game => wishListItems.includes(game.id)).length

    const completeItems = collection.filter(item => item.collection_name === 'completed' && item.user_id === user.id).map(item => item.game_id)
    console.log("COMPLETE ITEMS:",completeItems)
    const completeGames = allGames.filter(game => completeItems.includes(game.id)).length




    return (
        <div>
            <h2 className='text-center text-4xl font-bold text-purple-400 m-3'> {user.username}'s Lists</h2>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/backlog'}>Backlog List</Link>
                </h3>
                <p className='text-center'>{backLogGames} Games</p>
            </div>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/wish'}>Wish List</Link>
                </h3>
                <p className='text-center'>{wishListGames} Games</p>
            </div>
            <div className='card bg-neutral text-neutral-content w-50 m-3'>
                <h3 className='text-center text-3xl front-bold mt-2 mb-2 text-purple-600'>
                    <Link to={'/game/completed'}>Completed List</Link>
                </h3>
                <p className='text-center'>{completeGames} Games</p>
            </div>
        </div>
)}

export default Dashboard;