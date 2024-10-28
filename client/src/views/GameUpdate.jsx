import React, {useContext, useEffect, useState} from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';

const GameUpdate = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [gameErrors, setGameErrors] = useState({})
    const [game, setGame] = useState({
        name: '',
        genre: '',
        platform: '',
        how_its_owned: '',
        list: ''
    })

    useEffect(() => {
        // axios.get()
    },[gameId])

    const changeHandler = e => {
        const {name : value} = e.target
        setGame(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()
        const newGame = {...game, user_id: user.id}
        // axios.post()
            // .then(() => navigate('/games/list'))
            // .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[550px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">Update Game</h1>
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
                        
                        <p>How is it owned?</p>
                        <div>
                            <label className='m-2'>
                                Pysical
                                <input 
                                    type="checkbox" 
                                    name="how_its_owned"
                                    value='physical'
                                    onChange={changeHandler}
                                    checked={game.how_its_owned}
                                    className='ml-1'
                                />
                            </label>
                            <label className='m-2'>
                                Digital
                                <input 
                                    type="checkbox" 
                                    name="how_its_owned"
                                    value='digital'
                                    onChange={changeHandler}
                                    checked={game.how_its_owned}
                                    className='ml-1'
                                />
                            </label>
                        </div>
                        <p className='text-red-500'>{gameErrors.how_its_owned}</p>
                        <br></br>

                        <p>Platform it's owned on?</p>
                        <div>
                            <label className='m-2'>
                                Xbox
                                <input 
                                    type="checkbox" 
                                    name="platform"
                                    value='xbox'
                                    onChange={changeHandler}
                                    checked={game.platform}
                                    className='ml-1'
                                />
                            </label>
                            <label className='m-2'>
                                Playstation
                                <input 
                                    type="checkbox" 
                                    name="platform"
                                    value='playstation'
                                    onChange={changeHandler}
                                    checked={game.platform}
                                    className='ml-1'
                                />
                            </label>
                            <label className='m-2'>
                                Steam
                                <input 
                                    type="checkbox" 
                                    name="platform"
                                    value='steam'
                                    onChange={changeHandler}
                                    checked={game.platform}
                                    className='ml-1'
                                />
                            </label>
                            <label className='m-2'>
                                Nintentdo
                                <input 
                                    type="checkbox" 
                                    name="platform"
                                    value='nintendo'
                                    onChange={changeHandler}
                                    checked={game.platform}
                                    className='ml-1'
                                />
                            </label>
                            <label className='m-2'>
                                Other
                                <input 
                                    type="checkbox" 
                                    name="platform"
                                    value='other'
                                    onChange={changeHandler}
                                    checked={game.platform}
                                    className='ml-1'
                                />
                            </label>
                        </div>
                        <p className='text-red-500'>{gameErrors.platform}</p>
                        <br></br>

                        <select name="list" onChange={changeHandler} className="select select-bordered w-full max-w-xs">
                            <option value="">Select List</option>
                            <option value="backlog">Backlog</option>
                            <option value="wish">Wish</option>
                            <option value="completed">Completed</option>
                        </select>
                        <p className='text-red-500'>{gameErrors.list}</p>
                        <br></br>

                        <input type="submit" value="Update Game" className='py-3 bg-purple-800 text-black w-full rounded-md font-bold text-black' />
                    
                    </form>
                </div>
            </div>
        </div>
)}

export default GameUpdate;