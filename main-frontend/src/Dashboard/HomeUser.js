import React from 'react';
import Navbar from './NavbarDashboard';

const HomeUser = () => {
	return (
		<div>
			<Navbar />
			<br />
			<div className="d-flex justify-content-center">
				<div className="form-group col-md-6">
					<h2>Hola {JSON.parse(localStorage.getItem('user')).name}</h2>
				</div>
			</div>
		</div>
	);
};

export default HomeUser;
