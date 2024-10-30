import React, {useContext, useState} from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const GameCreate = () => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [gameErrors, setGameErrors] = useState({})
    const [game, setGame] = useState({
        name: '',
        genre: '',
        description: '',
    })

    const changeHandler = e => {
        const {name, value} = e.target
        setGame(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()

        if (!user.id) {
            console.error("User ID is not available")
            return;
        }

        const newGame = { ...game, user_id: user.id }; // Use user.id directly

        try {
            axios.post('http://localhost:5000/api/games/create', newGame);
            navigate('/game/catalog');
        } catch (err) {
            console.error(err);
            setGameErrors(err.response?.data || { general: 'Failed to create game' });
        }
        }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[550px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Add Game</h1>
                <hr/>
                <div className='flex justify-center mt-10'>
                    <form onSubmit={submitHandler}> 
                        
                        <input 
                            type="text"
                            name='name'
                            value={game.name}
                            onChange={changeHandler}
                            placeholder='Game Name'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                        />
                        <p className='text-red-500'>{gameErrors.name}</p>
                        <br></br>
                        
                        <input 
                            type="text"
                            name='genre'
                            value={game.genre}
                            onChange={changeHandler}
                            placeholder='Genre'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                        />
                        <p className='text-red-500'>{gameErrors.genre}</p>
                        <br></br>
                        
                        <input 
                            type="text"
                            name='description'
                            value={game.description}
                            onChange={changeHandler}
                            placeholder='Game Description'
                            className='py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] text-black'
                        />
                        <p className='text-red-500'>{gameErrors.description}</p>
                        <br></br>


                        <input type="submit" value="Add Game" className='py-3 bg-purple-800 text-black w-full rounded-md font-bold text-black' />
                    
                    </form>
                </div>
            </div>
        </div>
)}

export default GameCreate;