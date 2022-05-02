import React, { useEffect, useState } from 'react';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const EliminarImagen = () => {
	const [ allalbums, setAllalbums ] = useState([]);
	const [ album, setAlbum ] = useState('');
	const [ allimagenes, setAllimagenes ] = useState([]);
	const [ imagen, setImagen ] = useState('1');

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

		fetch(`${config.BACKEND}/user/getalbums`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setAllalbums(result.msj);
				setAlbum(result.msj[0].id);
			})
			.catch((error) => console.log('error', error));
	}, []);

	const submit_ = (e) => {
		e.preventDefault();
		console.log(album);
		setAlbum(allalbums[0].id);
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
								Eliminar Imagen Album
							</label>
							<select
								className="form-control"
								name="select-1651464146133"
								id="select-1651464146133"
								onChange={(e) => setImagen(e.target.value)}
								value={imagen}
							>
								<option value="1" id="select-1651464146133-0">
									Imagen 1
								</option>
							</select>
						</div>
						<br />
						<div className="form-group col-md-8">
							<label htmlFor="user" className="form-label">
								Del Album
							</label>
							<select
								className="form-control"
								name="select-1651464146133"
								id="select-1651464146133"
								onChange={(e) => setAlbum(e.target.value)}
								value={album}
							>
								<option value="1" id="select-1651464146133-0">
									Album 1
								</option>
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
