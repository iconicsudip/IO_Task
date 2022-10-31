import {useSelector} from 'react-redux';
import Home from './components/Home'
import Login from './components/Login'
import Showmovie from './components/Showmovie'
import Actor from './components/Actor'
import Producer from './components/Producer'
import Header from './components/Header'
import SignUp from './components/SignUp'
import OpenActorMovies from './components/OpenActorMovies'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OpenProdMovies from './components/OpenProdMovies';
import PrivateRoute from './PrivateRoute';
import {useDispatch} from 'react-redux';
import {userAuthenticated} from './actions/allActions'
import React,{useEffect} from 'react'
function App() {
  const userid = useSelector((state)=>{
    return state.userid
  })
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route exact path="/actors" element={<PrivateRoute><Actor /></PrivateRoute>} />
            <Route exact path="/producers" element={<PrivateRoute><Producer /></PrivateRoute>} />
            <Route exact path="/movie/:movieid" element={<PrivateRoute><Showmovie /></PrivateRoute>} />
            <Route exact path="/actor/movies/:actorid" element={<PrivateRoute><OpenActorMovies /></PrivateRoute>} />
            <Route exact path="/producer/movies/:prodid" element={<PrivateRoute><OpenProdMovies /></PrivateRoute>} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
