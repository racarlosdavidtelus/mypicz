import './App.css';
import React from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Home/Home';
import Signup from './Home/Signup';
import Login from './Home/Login';
import Upload from './Dashboard/Upload';

function App() {
  return (
    <>
        <Switch>
          {/* OUT */}
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* IN 
          <Route exact path="/dashboard" render={() => (<Dashboard pokemons={pokemons} />)} />
          */}
          <Route exact path="/upload" component={Upload} />
          
        </Switch>
        <ToastContainer autoClose={1500} hideProgressBar />
    
    </>
  );
}

export default App;
