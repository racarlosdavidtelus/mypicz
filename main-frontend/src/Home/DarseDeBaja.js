import React from 'react';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const DarseDeBaja = () => {
	const submit_ = (e) => {
		e.preventDefault();
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

		fetch(`${config.BACKEND}/user/deleteuser`, requestOptions)
			.then((response) => response.json())
			.then((result) => {})
			.catch((error) => console.log('error', error));
		window.location.href = '/';
	};
	return (
		<div>
			<Navbar />
			<br />
			<div className="d-flex justify-content-center">
				<div className="form-group col-md-6">
					<form onSubmit={submit_}>
						<div className="mb-3">
							<button type="submit" className="btn btn-warning">
								Darse de Baja
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default DarseDeBaja;
