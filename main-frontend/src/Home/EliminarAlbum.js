import React, { useState } from 'react';
import Navbar from '../Dashboard/NavbarDashboard';

const EliminarAlbum = () => {
	const [ album, setAlbum ] = useState('1');
	const submit_ = (e) => {
		e.preventDefault();
		console.log(album);
		setAlbum('1');
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
