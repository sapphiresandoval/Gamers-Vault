import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import RatingForm from '../components/RatingForm';
import axios from 'axios'


const GameDisplay = (props) => {
    const {gameId} = useParams()
    const {game, setGame} = useContext(userContext)
    const {user, setUser} = useContext(userContext)

    console.log(game)
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
                setGame(response.data);  // Set the game state with fetched data
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGame();
    }, [gameId])
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[200px] rounded-3xl xl:shadow-xl">
            <h2 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Game Name: {game.name}</h2>
            <hr/>
                <p>Average Rating</p>
                <p>Genre: {game.genre}</p>
                <p>Desctiption: {game.description}</p>

                {/* Add to list if not in user list */}
                <form>
                    <select name="list"  className="select select-bordered w-full max-w-xs">
                        <option value="">Select List</option>
                        <option value="backlog">Backlog</option>
                        <option value="wish">Wish</option>
                        <option value="completed">Completed</option>
                    </select>
                </form>
            </div>
            <RatingForm/>
        </div>
)}

export default GameDisplay;