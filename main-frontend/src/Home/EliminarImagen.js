import React, { useState } from 'react';
import Navbar from '../Dashboard/NavbarDashboard';

const EliminarImagen = () => {
	const [ album, setAlbum ] = useState('1');
	const [ imagen, setImagen ] = useState('1');
	const submit_ = (e) => {
		e.preventDefault();
		console.log(album);
		setAlbum('1');
		setImagen('1');
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
								<option value="2" id="select-1651464146133-0">
									Imagen 2
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
								<option value="2" id="select-1651464146133-0">
									Album 2
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
