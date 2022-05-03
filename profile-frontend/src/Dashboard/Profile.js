//import { useState, useEffect } from 'react'
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import NavbarDashboard from './NavbarDashboard';

const Profile = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        biografia: '',
        url_photo: ''
    })

    useEffect(()=>{
        //const paramId = parseInt(window.location.href.split('id')[1].substring(1), 10);
        const currentUserId = JSON.parse(localStorage.getItem("userId")) === null ? 25 : JSON.parse(localStorage.getItem("userId"))
        const body = {userId: currentUserId}
        fetch(`${config.CLOUD_FUNCTION_USER}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data_response => { 
            if (data_response.error == null) {
       
                console.log(data_response)
                setData({
                    name: data_response.msj.name,
                    email: data_response.msj.email,
                    biografia: data_response.msj.biografia,
                    url_photo: data_response.msj.url_photo
                })
               
            }else{
                toast.error(data_response.msj)
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    const history = useHistory();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const save = (event) => {
        event.preventDefault();
        const currentUserId = JSON.parse(localStorage.getItem("user")) === null ? 1 : JSON.parse(localStorage.getItem("user")).id 
        const body = {
            id: currentUserId,
            name: data.name,
            email: data.email,
            biografia: data.biografia
        }
        fetch(`${config.BACKEND}/user/update`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data_response => { 
            if (data_response.error == null) {
                //console.log(data_response);
                toast.success('User Updated', {
                    onClose: () => {
                        history.replace("/profile")
                    }
                })
            }else{
                toast.error(data_response.msj)
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
            <main className="container">
                <h1>Profile</h1>
                <form onSubmit={save}>

					<div>
						<img src={data.url_photo} alt={""} style={{height:200, width:200}}/>
					</div>
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} className="form-control" value={data.name}></input>
                        </div>
                    </div>

                    <div className="form-group col-md-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" value={data.email}></input>
                    </div>

                    <div className="form-group col-md-12">
                            <label htmlFor="biografia" className="form-label">Biografia</label>
                            <input type="text" name="biografia" id="biografia" onChange={handleInputChange} className="form-control" value={data.biografia}></input>
                    </div>

                    <br></br>           
                    <br></br>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </main>
            </div>
            </div>
        </>
    )
}

export default Profile;
