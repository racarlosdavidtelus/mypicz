import React, { useEffect, useState } from 'react';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const EliminarAlbum = () => {
	const [ allalbums, setAllalbums ] = useState([]);
	const [ album, setAlbum ] = useState('');

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
				setAlbum(result.msj[0].name);
			})
			.catch((error) => console.log('error', error));
	}, []);
	const submit_ = (e) => {
		e.preventDefault();
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
								Eliminar el Album
							</label>
							<select
								className="form-control"
								name="select-1651464146133"
								id="select-1651464146133"
								onChange={(e) => setAlbum(e.target.value)}
								value={album}
							>
								{allalbums.map((e) => {
									return (
										<option value={parseInt(e.id)} key={e.id}>
											{e.name}
										</option>
									);
								})}
							</select>
						</div>
						<br />
						<div className="mb-3">
							<button type="submit" className="btn btn-primary">
								Eliminar Album
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EliminarAlbum;
