import React, { useState } from 'react';
import Navbar from '../Dashboard/NavbarDashboard';

const CrearAlbum = () => {
	const [ name, setName ] = useState('');

	const submit_ = (e) => {
		e.preventDefault();
		console.log(name);
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
