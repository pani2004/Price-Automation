import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SearchComponent from './components/SearchComponent';
import PrivateRoute from './components/PrivateRoute'; 
import HomePage from './pages/Homepage';
import SearchPage from './pages/Search';
import ModelPage from './components/Model';
import ServicePage from './components/Service';
import SpecificationPage from './components/Specification';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search1' element={<SearchComponent/>}/>
        {/* Protected route for SearchComponent */}
        <Route element={<PrivateRoute />}>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/model' element={<ModelPage />} />
          <Route path='/service' element={<ServicePage/>}/>
          <Route path='/specification' element={<SpecificationPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

