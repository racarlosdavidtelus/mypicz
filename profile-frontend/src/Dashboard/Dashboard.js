import React, { useState, useEffect } from "react";
import NavbarDashboard from './NavbarDashboard';
import Card from "./Card";
import { toast } from 'react-toastify'
import config from '../config/config';

const Dashboard = () => {
    const [albums,setAlbums] = useState([])
    const [albumfotos,setAlbumFotos] = useState([]);
    const [fotos, setFotos] = useState([])  

    const handleInputChangeAlbum = (event) => {
      
        var newArray = albumfotos.filter(function (al) {
            return al.name === event.target.value
        });
        console.log(newArray)
        setFotos(newArray)
    }

    useEffect(()=>{
        try {
            const paramId = parseInt(window.location.href.split('id')[1].substring(1), 10);
            localStorage.setItem('userId', JSON.stringify(paramId));
        } catch (error) {
            
        }
        
        const currentUserId = JSON.parse(localStorage.getItem("userId")) === null ? 25 : JSON.parse(localStorage.getItem("userId"))
        const body = {userId: currentUserId}
        fetch(`${config.CLOUD_FUNCTION_ALBUMSPHOTOS}`, {
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
       
                //console.log(data_response.msj)
                
                setAlbums(data_response.msj.albums)
                setAlbumFotos(data_response.msj.fotos)
            }else{
                toast.error(data_response.msj)
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    return(
        <div>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
      <div className="d-flex justify-content-center">
        <div className="row">
          <main className="container">

            <div className="row g-3 align-items-center">
                <div className="form-group col-md-12">
                    <label htmlFor="numeroTelefono">Your albums</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group">
                                <select  id="album" onChange={handleInputChangeAlbum} className="form-control">
                                {
                                    albums.map((al,index)=>(
                                     <option key={index}>{al.name}</option> 
                                ))
                                }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
          </main>
        </div>
      </div>

        <div className="row row-cols-1 row-cols-md-5 g-4 container-fluid">
            { fotos.map((foto,index) => (                  
                <Card key={index} foto={foto} index={index}></Card>
            ))}
        </div>

      
           
        </div>
    );
}

export default Dashboard;
