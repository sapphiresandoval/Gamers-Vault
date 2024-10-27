import {Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './views/Login'
import Registration from './views/Registration'
import Error from './views/Error'
import Dashboard from './views/Dashboard'

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
        {/* <Route  path='/game/backlog' element={<GameList/>}/> */}
        {/* <Route  path='/game/wish' element={<GameList/>}/> */}
        {/* <Route  path='/game/complete' element={<GameList/>}/> */}

        {/* Game View */}
        {/* <Route  path='/game/:id' element={<GameDisplay/>}/> */}

        {/* Game Forms */}
        {/* <Route path='/game/create' element={<GameCreate/>}/> */}
        {/* <Route path='/game/update' element={<GameUpdate/>}/> */}

        {/* Error page Stays at bottom of Routes */}
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default App
