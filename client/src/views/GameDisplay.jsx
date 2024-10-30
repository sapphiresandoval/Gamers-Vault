import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import RatingForm from '../components/RatingForm';
import axios from 'axios'


const GameDisplay = (props) => {
    const {gameId} = useParams()
    const {game, setGame} = useContext(userContext)
    const {user, setUser} = useContext(userContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/games/${gameId}`)
    }, [gameId])
    // may need another azios call for submit handler... unsure of forms rn...
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[200px] rounded-3xl xl:shadow-xl">
            <h2 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Game Name</h2>
            <hr/>
                <p>Average Rating</p>
                <p>Genre</p>

                {/* Add to list if not in user list */}
                <form>
                    <select name="list" onChange={changeHandler} className="select select-bordered w-full max-w-xs">
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