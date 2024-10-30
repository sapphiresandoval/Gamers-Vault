import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import RatingForm from '../components/RatingForm';
import axios from 'axios'


const GameDisplay = (props) => {
    const {gameId} = useParams()
    const {game, setGame} = useContext(userContext)
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [list, setList] = useState({
        list: ''
    })

    console.log(game)
    console.log(user)

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

    const changeHandler = e => {
        const {name, value} = e.target
        setList(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()

        if (!user.id) {
            console.error("User ID is not available")
            return;
        }

        const newList = { ...list, user_id: user.id, game_id: game.id }; // Use user.id directly

        try {
            axios.post('http://localhost:5000/api/list/create', newList);
            navigate(`/game/${game.id}`);
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[300px] rounded-3xl xl:shadow-xl">
            <h2 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Game Name: {game.name}</h2>
            <hr/>
                <p>Average Rating</p>
                <p>Genre: {game.genre}</p>
                <p>Desctiption: {game.description}</p>
            <hr/>
            <h3 className="text-center text-xl font-bold mt-2 mb-2 text-purple-600">Add To List</h3>
                {/* Add to list if not in user list */}
                <form onSubmit={submitHandler}>
                    <select name="list" onChange={changeHandler} className="select select-bordered w-full max-w-xs">
                        <option value="">Select List</option>
                        <option value="backlog">Backlog</option>
                        <option value="wish">Wish</option>
                        <option value="completed">Completed</option>
                    </select>
                    
                    <input type="submit" value="Add To List" className='py-3 bg-purple-800 text-black w-[95px] h-[50px] rounded-md font-bold text-black ml-2' />
                    
                </form>
            </div>
            {/* <RatingForm/> */}
        </div>
)}

export default GameDisplay;