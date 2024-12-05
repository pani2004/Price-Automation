
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SearchComponent from './components/SearchComponent';
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component
import HomePage from './pages/Homepage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<HomePage/>}/>
        {/* Protected route for SearchComponent */}
        <Route element={<PrivateRoute />}>
          <Route path='/search' element={<SearchComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

