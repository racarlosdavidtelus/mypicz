import React from 'react';
import Navbar from './Navbar';
import '../App.css';

function Home() {
	return (
		<div>
			<Navbar />
			<br />
			<div className="container">
				<div className="Pokedexs" />
			</div>
			<footer>
				<nav>
					<div className="color_base" style={{ height: 50 }} />
				</nav>
			</footer>
			<footer className="section footer-classic context-dark bg-image mt-4" />
		</div>
	);
}

export default Home;
