import { createContext, useState} from 'react'

export const userContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [game, setGame] = useState({})
    const [allGames, setAllGames] = useState([])
    const [collection, setCollection] = useState([])
    return (
        <userContext.Provider
        value={{
            user, setUser,
            game, setGame,
            allGames, setAllGames,
            collection, setCollection
        }}>
            {props.children}
        </userContext.Provider>
    )
}