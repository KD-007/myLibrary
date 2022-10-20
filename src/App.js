import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import StateContext from './Context/StateContext';

import{BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <StateContext>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar/>} >
        <Route index element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        </Route>
        </Routes>
         </BrowserRouter>
         </StateContext>
         

    </div>
  );
}

export default App;
