import { createContext, useState} from 'react'

export const userContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({})
    const [game, setGame] = useState({})
    const [allGames, setAllGames] = useState([])
    
    return (
        <userContext.Provider
        value={{
            user, setUser,
            game, setGame,
            allGames, setAllGames
        }}>
            {props.children}
        </userContext.Provider>
    )
}