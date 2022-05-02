import React, { useState } from 'react';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const CrearAlbum = () => {
	const [ name, setName ] = useState('');

	const submit_ = (e) => {
		e.preventDefault();
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			id: JSON.parse(localStorage.getItem('user')).id,
			name
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch(`${config.BACKEND}/user/postalbum`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log('error', error));
			
	};

	return (
		<div>
			<Navbar />
			<br />
			<div className="d-flex justify-content-center">
				<div className="form-group col-md-6">
					<form onSubmit={submit_}>
						<div className="form-group col-md-8">
							<label htmlFor="user" className="form-label">
								Nombre del Album
							</label>
							<input
								type="text"
								onChange={(e) => setName(e.target.value)}
								className="form-control"
								value={name}
							/>
						</div>
						<br />
						<div className="mb-3">
							<button type="submit" className="btn btn-primary">
								Crear Album
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CrearAlbum;
