import './App.css';
import React from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './Dashboard/Profile';
import Password from './Dashboard/Password';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <>
        <Switch>
          {/* OUT */}
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/password" component={Password} />
          {/* IN 
          <Route exact path="/dashboard" render={() => (<Dashboard pokemons={pokemons} />)} />
          */}
          
          
        </Switch>
        <ToastContainer autoClose={1500} hideProgressBar />
    
    </>
  );
}

export default App;
