import { useHistory } from 'react-router-dom';

const Navbar = () => {
	const history = useHistory();

	const onProfile = (event) => {
		event.preventDefault();
		history.replace('/profile');
	};

	const onAgregarImagen = (event) => {
		history.replace('/agregarimagen');
	};
	const onCrearAlbum = (event) => {
		history.replace('/crearalbum');
	};
	const onEliminarAlbum = (event) => {
		history.replace('/eliminaralbum');
	};
	const onEliminarImgen = (event) => {
		history.replace('/eliminarimagen');
	};
	const onDarseDeBaja = (event) => {
		history.replace('/darsedebaja');
	};

	const onLogOut = (event) => {
		localStorage.removeItem('user');
		history.replace('/');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="true"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<button className="btn btn-light" onClick={onProfile}>
							<i className="bi bi-person-fill" />
							{`  `}
						</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-light" onClick={onAgregarImagen}>
							Agregar Imagen
						</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-light" onClick={onCrearAlbum}>
							Crear Album
						</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-light" onClick={onEliminarAlbum}>
							Eliminar Album
						</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-light" onClick={onEliminarImgen}>
							Eliminar Imagen
						</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-light" onClick={onDarseDeBaja}>
							Darse de Baja
						</button>
					</li>
				</ul>
			</div>
			<button className="btn btn-light" onClick={onLogOut}>
				<i className="bi bi-x-circle" />
			</button>
		</nav>
	);
};

export default Navbar;
