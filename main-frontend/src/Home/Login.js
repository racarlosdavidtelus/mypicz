//import { useState, useEffect } from 'react'
import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import Navbar from './Navbar';

const Login = () => {
   console.log(`${config.BACKEND}/user/login`,config)
    const [data, setData] = useState({
        user: '',
        password: ''
    })

    const history = useHistory();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const save = (event) => {
        event.preventDefault()
        fetch(`${config.BACKEND}/user/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error == null) {
                //set user to localstorage
                localStorage.setItem("user", JSON.stringify(data.msj));
                setData({
                    user: '',
                    password: '',
                })
                toast.success(`Welcome ${data.msj.name}`, {
                    onClose: () => {
                        console.log("ir a upload")
                        history.replace("/upload")
                    }
                })
            }else{
                toast.error(data.msj)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <Navbar></Navbar>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="form-group col-md-6">
           
                <h1>Login</h1>
                <form onSubmit={save}>
                    
                    <div className="form-group col-md-8">
                        <label htmlFor="user" className="form-label">User</label>
                        <input type="text" name="user" id="user" onChange={handleInputChange} className="form-control" value={data.user}></input>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" onChange={handleInputChange} className="form-control" value={data.password}></input>
                    </div>
                   <br></br>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                 
                </form>
          
            </div>
            </div>
        </Fragment>
    )
}

export default Login;
