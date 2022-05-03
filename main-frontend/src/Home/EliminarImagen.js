import React, { useEffect, useState } from 'react';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const EliminarImagen = () => {
	const [ allimagenes, setAllimagenes ] = useState([]);
	const [ imagen, setImagen ] = useState('');

	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			id: JSON.parse(localStorage.getItem('user')).id
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch(`${config.BACKEND}/user/getimages`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setAllimagenes(result.msj);
				setImagen(result.msj[0].id);
			})
			.catch((error) => console.log('error', error));
	}, []);

	const submit_ = (e) => {
		e.preventDefault();

		console.log(JSON.parse(localStorage.getItem('user')).id);
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			id: imagen
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch(`${config.BACKEND}/user/deleteimage`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log('error', error));
		window.location.href = '/upload';
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
								La Imagen Album
							</label>
							<select
								className="form-control"
								name="select-1651464146133"
								id="select-1651464146133"
								onChange={(e) => setImagen(e.target.value)}
								value={imagen}
							>
								{allimagenes.length === 0 ? null : (
									allimagenes.map((e) => {
										return (
											<option value={parseInt(e.id)} key={e.id}>
												{e.descripcion}
											</option>
										);
									})
								)}
							</select>
						</div>
						<br />
						<div className="mb-3">
							<button type="submit" className="btn btn-primary">
								Eliminar Imagen
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EliminarImagen;
