import {Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './views/Login'
import Registration from './views/Registration'
import Error from './views/Error'
import Dashboard from './views/Dashboard'
import GameCreate from './views/GameCreate'
import GameUpdate from './views/GameUpdate'
import BacklogList from './views/BacklogList'
import WishList from './views/WishList'
import CompletedList from './views/CompletedList'
import GameDisplay from './views/GameDisplay'


function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        {/* Login & Reg */}
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>

        {/* Game Routes */}
        <Route path='/games/list' element={<Dashboard/>}/>
        
        {/* List Views */}
        <Route  path='/game/backlog' element={<BacklogList/>}/>
        <Route  path='/game/wish' element={<WishList/>}/>
        <Route  path='/game/completed' element={<CompletedList/>}/>

        {/* Game View */}
        <Route  path='/game' element={<GameDisplay/>}/>

        {/* Game Forms */}
        <Route path='/game/create' element={<GameCreate/>}/>
        <Route path='/game/update/:gameId' element={<GameUpdate/>}/>

        {/* Error page Stays at bottom of Routes */}
        <Route path='*' element={<Error/>}/>

      </Routes>
    </>
  )
}

export default App
