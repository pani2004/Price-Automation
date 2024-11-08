import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SearchComponent from './components/SearchComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/' element={<SearchComponent/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
