//import { useState, useEffect } from 'react'
import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import NavbarDashboard from './NavbarDashboard';

const Password = () => {
   
    const [newpassword, setNewPassword] = useState({
        password: ''
    })

    const history = useHistory();

    const handleInputChange = (event) => {
        setNewPassword({
            [event.target.name]: event.target.value
        });
    }

    const save = (event) => {
        event.preventDefault()
     
        const currentUserId = JSON.parse(localStorage.getItem("userId")) === null ? 25 : JSON.parse(localStorage.getItem("userId"))
        const body = {id:currentUserId,password: newpassword.password}
        fetch(`${config.BACKEND}/user/password`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error == null) {
                setNewPassword({
                    password: '',
                })
                toast.success(`Password changed`, {
                    onClose: () => {
                        history.replace("/profile")
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
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="form-group col-md-6">
           
                <h1>Change Password</h1>
                <form onSubmit={save}>
    
                    <div className="form-group col-md-8">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" name="password" id="password" onChange={handleInputChange} className="form-control" value={newpassword.password}></input>
                    </div>
                   <br></br>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                 
                </form>
          
            </div>
            </div>
        </Fragment>
    )
}

export default Password;
