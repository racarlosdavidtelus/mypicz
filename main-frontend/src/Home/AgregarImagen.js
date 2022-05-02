import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import config from '../config/config';
import Navbar from '../Dashboard/NavbarDashboard';

const AgregarImagen = () => {
	const [ allalbums, setAllalbums ] = useState([]);
	const [ album, setAlbum ] = useState('');
	const [ user, setUser ] = useState({});
	const [ data, setData ] = useState({
		descripcion: '',
		photo: {}
	});

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

	useEffect(() => {
		const currentUser = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'));
		//console.log(pomodoroSaved)
		setUser(currentUser);
	}, []);

	const [ photo, setPhoto ] = useState();

	const history = useHistory();

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const handleonFileChange = (event) => {
		setPhoto(event.target.files[0]);
	};

	function extraerBase64() {
		return new Promise((resolve) => {
			try {
				const reader = new FileReader();
				reader.readAsDataURL(photo);
				reader.onload = () => {
					const base64String = reader.result;
					resolve({
						name: photo.name,
						tipoFile: photo.name.match(/\.([^.]+)$/)[1],
						sizeFile: photo.size,
						base: base64String
					});
				};
				reader.onerror = (error) => {
					resolve({
						base: null
					});
				};
			} catch (e) {
				return null;
			}
		});
	}

	const save = (event) => {
		event.preventDefault();

		fetch(`${config.BACKEND}/user/upload`, {
			method: 'POST',
			body: JSON.stringify({ ...data, userId: user.id, name: user.name, album }),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.error == null) {
					setData({
						descripcion: '',
						photo: {}
					});
					toast.success('User Created', {
						onClose: () => {
							history.replace('/upload');
						}
					});
				} else {
					toast.error(data.msj);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		setAlbum(allalbums[0].id);
		setData({
			descripcion: '',
			photo: {}
		});
	};

	const onFileUpload = (event) => {
		event.preventDefault();
		extraerBase64().then((miFile) => {
			setData({
				...data,
				photo: miFile
			});
		});
		console.log(data);
	};
	return (
		<Fragment>
			<Navbar />
			<br />
			<div className="d-flex justify-content-center">
				<div className="card w-75">
					<main className="container">
						<h1>Subir foto</h1>
						<form onSubmit={save}>
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
							<div className="form-group col-md-12">
								<label htmlFor="descripcion" className="form-label">
									Descripcion
								</label>
								<input
									type="text"
									name="descripcion"
									id="descripcion"
									onChange={handleInputChange}
									className="form-control"
									value={data.descripcion}
								/>
							</div>

							<div className="row g-3 align-items-center">
								<div className="form-group col-md-9">
									<label htmlFor="photo" className="form-label">
										Photo
									</label>
									<br />
									<input type="file" onChange={handleonFileChange} />
									<button className="btn btn-primary" onClick={onFileUpload}>
										Upload Photo
									</button>
								</div>
							</div>

							<br />

							<br />
							<div className="mb-3">
								<button type="submit" className="btn btn-primary">
									Subir Imagen
								</button>
							</div>
						</form>
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default AgregarImagen;
