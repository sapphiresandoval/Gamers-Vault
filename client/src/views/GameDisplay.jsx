import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import RatingForm from '../components/RatingForm';
import axios from 'axios'


const GameDisplay = () => {
    const {gameId} = useParams()
    const {game, setGame} = useContext(userContext)
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const [collection, setCollection] = useState({
        collection_name: ''
    })

    console.log(game)
    console.log(user)

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
                {
                    setGame(response.data);  // Set the game state with fetched data
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGame();
    }, [gameId, setGame])

    const changeHandler = e => {
        const {name, value} = e.target
        setCollection(prev => ({...prev, [name]: value}))
    }

    const submitHandler = e => {
        e.preventDefault()

        if (!user.id) {
            console.error("User ID is not available")
            return;
        }

        if (!collection.collection_name){
            console.error("Please select a collection.")
            return
        }

        const newCollection = { ...collection, user_id: user.id, game_id: game.id }; // Use user.id directly

        
        axios.post('http://localhost:5000/api/collections/createcollection', newCollection)
        .then( res => setCollection(res.data))
        .catch(err => console.log("COLLECTION ERROR:", err))
        navigate('/game/catalog')
        console.log(newCollection)
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[350px] rounded-3xl xl:shadow-xl">
            <h2 className="text-center text-3xl font-bold mt-2 mb-2 text-purple-600">{game.name}</h2>
            <hr/>
                <p className=' text-center text-lg font-bold m-3'>Genre: </p>
                <p className=' text-center text-lg font-bold m-1'>{game.genre} </p>
                <p className=' text-center text-lg font-bold m-3'>Description: </p>
                <p className=' text-center text-lg font-bold m-1'>{game.description} </p>
            <hr/>
            <h3 className="text-center text-xl font-bold mt-2 mb-2 text-purple-600">Add To Collection</h3>
                {/* Add to collection if not in user collection */}
                <form onSubmit={submitHandler}>
                    <select name="collection_name" value={collection.collection_name} onChange={changeHandler} className="select select-bordered w-full max-w-xs">
                        <option value="">Select Collection</option>
                        <option value="backlog">Backlog</option>
                        <option value="wish">Wish</option>
                        <option value="completed">Completed</option>
                    </select>
                    
                    <input type="submit" value="Add To Collection" className='py-3 bg-purple-800 text-black w-[200px] h-[50px] rounded-md font-bold text-black ml-2' />
                    
                </form>
            </div>
            {/* <RatingForm/> */}
        </div>
)}

export default GameDisplay;