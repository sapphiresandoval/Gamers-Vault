import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import RatingForm from '../components/RatingForm';

const GameDisplay = (props) => {
    const { gameId } = useParams()
    const { game, setGame } = useContext(userContext)
    const { user, setUser } = useContext(userContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/games/${gameId}`)
        .then(res => setGame(res.data))
        .catch(err => console.log(err))
    }, [gameId])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[200px] rounded-3xl xl:shadow-xl">
                <h2 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Game Name</h2>
                <hr />
                <p>Average Rating</p>
                <p>Genre</p>
            </div>
            <RatingForm />
        </div>
    )
}

export default GameDisplay;