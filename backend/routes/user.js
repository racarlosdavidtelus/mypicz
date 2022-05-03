var express = require('express');
var router = express.Router();
const { Storage } = require('@google-cloud/storage');
const pool = require('../databases_connections/mysql_connection');
const storage = new Storage();

router.post('/signup', function(req, res) {
	const { name, password, email, biografia, profile_photo } = req.body;
	try {
		// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
		// verificando correo
		pool.query('SELECT * FROM user WHERE email=? ;', [ email ], function(err, result) {
			console.log(result);
			if (err) throw err;
			if (result.length == 0) {
				uploadFile(name, profile_photo, profile_photo.name);
				let path = 'https://storage.googleapis.com/mypicz-storage/' + name + '/' + profile_photo.name;
				//inserto en db
				var sql = 'INSERT INTO user (name,password,email,biografia,url_photo) VALUES(?,?,?,?,?);';
				pool.query(sql, [ name, password, email, biografia, path ], function(err, result) {
					if (err) throw err;
					if (result.length != 0) {
						id_usuario = result.insertId;
						var sql2 = 'INSERT into album (id_user,name) values ((select id from user where name=? ),?);';
						pool.query(sql2, [ name, name ], function(err, result) {
							if (err) throw err;
						});
					}
				});

				console.log('Nuevo Usuario agregado a la BASE DE DATOS');
				res.status(201).json({ msj: 'User Created', error: null });
			} else {
				res.status(409).json({ msj: 'The email already exists in the database', error: true });
			}
		});
	} catch (er) {
		//console.log(error);
		res.status(500).json({ msj: 'error', error: er });
	}
});

router.put('/update', function(req, res) {
	console.log(req.body);
	const { id, name, email, biografia } = req.body;
	try {
		// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
		// verificando si existe el usuario con el id
		pool.query('SELECT * FROM user WHERE id=? ;', [ id ], function(err, result) {
			if (err) throw err;
			if (result.length != 0) {
				//actualizo el registro en db
				var sql = 'UPDATE user SET name=?,email=?,biografia=? WHERE id=? ;';
				pool.query(sql, [ name, email, biografia, id ], function(err, result) {
					if (err) throw err;
					if (result.length != 0) {
					}
				});
				console.log('Usuario actualizado en la BASE DE DATOS');
				res.status(201).json({ msj: 'User info updated', error: null });
			} else {
				res.status(409).json({ msj: 'The user dont exists in the database', error: true });
			}
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/login', function(req, res) {
	const { user, password } = req.body;
	const email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
	const isEmail = email.exec(user);
	let query = '';
	if (!isEmail) {
		query = 'SELECT * FROM user WHERE name=?;';
		console.log('El usuario quiere ingresar con nombre: ' + user);
	} else {
		query = 'SELECT * FROM user WHERE email=?;';
		console.log('El usuario quiere ingresar con correo: ' + user);
	}
	try {
		// verificando correo
		pool.query(query, [ user ], function(err, result) {
			if (err) throw err;
			if (result.length > 0) {
				const data = result[0];
				const SavePassword = data.password;
				const RecivedPassword = password;
				//console.log(data)
				if (SavePassword == RecivedPassword) {
					res.status(200).json({
						msj: { id: data.id, name: data.name, biografia: data.biografia, url_photo: data.url_photo },
						error: null
					});
				} else {
					res.status(401).json({ msj: 'Incorrect password', error: true });
				}
			} else {
				res.status(404).json({ msj: 'User not found in database', error: true });
			}
		});
	} catch (er) {
		//console.log(er);
		res.status(404).json({ msj: 'User not found in database', error: er });
	}
});

router.post('/upload', function(req, res) {
	const { userId, photo, descripcion, name, album } = req.body;
	//console.log(req.body)
	console.log(album);
	try {
		uploadFile(name, photo, photo.name);
		let path = 'https://storage.googleapis.com/mypicz-storage/' + name + '/' + photo.name;
		//inserto en db
		var sql = 'INSERT INTO foto (url,descripcion) VALUES(?,?);';
		pool.query(sql, [ path, descripcion ], function(err, result) {
			if (err) throw err;
			var sql2 = 'insert into albumfoto values (?,(select id from foto f where f.url=? and f.descripcion=? ));';
			pool.query(sql2, [ album, path, descripcion ], function(err, result) {
				if (err) throw error;
			});
			res.status(201).json({ msj: 'Foto added', error: null });
		});
		/*
        pool.query("SELECT * FROM user WHERE id=? ;", [userId], function(err,result){
            console.log(result)
            if (err) throw err;
            if (result.length !== 0) {
                const name = result[0].name
                uploadFile(name,photo,photo.name)
                let path = 'https://storage.googleapis.com/mypicz-storage/'+name+"/"+photo.name;
                //inserto en db
                var sql = "INSERT INTO user (name,password,email,biografia,url_photo) VALUES(?,?,?,?,?);";
                pool.query(sql, [name,password,email,biografia,path], function(err,result){
                    if (err) throw err;
                    if(result.length != 0){
                        id_usuario=result.insertId;
                        
                    }
                });
                console.log("Nuevo Usuario agregado a la BASE DE DATOS")
                res.status(201).json({msj: 'User Created',error: null});
            }else{
                res.status(409).json({msj: 'The email already exists in the database',error: true}); 
            }
          });
          */
	} catch (er) {
		//console.log(error);
		res.status(500).json({ msj: 'error', error: er });
	}
});

router.post('/addPokemon', async function(req, res) {
	console.log(req.body);
	const { pokemon_id, name, types, url_photo, id_user } = req.body;
	try {
		await mongoConnection.connect();
		const database = mongoConnection.db('pokedex');
		const pokemon = database.collection('pokemon');
		// create a document to insert
		const doc = {
			title: 'Record of a Shriveled Datum',
			content: 'No bytes, no problem. Just insert a document, in MongoDB'
		};
		const result = await pokemon.insertOne(req.body);

		res.status(201).json({ msj: `Pokemon was inserted with the _id: ${result.insertedId}`, error: null });
	} catch (er) {
		//console.log(error);
		res.status(500).json({ msj: 'error', error: er });
	} finally {
		await mongoConnection.close();
	}
});

router.get('/getPokemons/userid/:userId', async function(req, res) {
	const user_id = parseInt(req.params.userId, 10);
	console.log(user_id);
	try {
		await mongoConnection.connect();
		const database = mongoConnection.db('pokedex');
		const pokemon = database.collection('pokemon');

		const query = { id_user: user_id };
		const cursor = pokemon.find(query, {});
		// print a message if no documents were found
		if ((await cursor.count()) === 0) {
			console.log('No documents found!');
			res.status(404).json({ msj: 'No documents found!', error: true });
		} else {
			let data = [];
			await cursor.forEach((element) => data.push(element));
			res.status(200).json({ msj: data, error: null });
		}
		// replace console.dir with your callback to access individual elements
		//await cursor.forEach(console.dir);
	} catch (er) {
		//console.log(error);
		res.status(500).json({ msj: 'error', error: er });
	} finally {
		await mongoConnection.close();
		console.log('closing mongoconnection');
	}
});

router.patch('/password', function(req, res) {
	const { id, password } = req.body;
	console.log(req.body);
	try {
		// verificando si existe el usuario con el id
		pool.query('SELECT * FROM user WHERE id=? ;', [ id ], function(err, result) {
			if (err) throw err;
			if (result.length != 0) {
				//actualizo el registro en db
				var sql = 'UPDATE user SET password=? WHERE id=? ;';
				pool.query(sql, [ password, id ], function(err, result) {
					if (err) throw err;
					if (result.length != 0) {
					}
				});
				console.log('Usuario actualizado en la BASE DE DATOS');
				res.status(201).json({ msj: 'Password updated', error: null });
			} else {
				res.status(409).json({ msj: 'The user dont exists in the database', error: true });
			}
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/getalbums', async (req, res) => {
	const { id } = req.body;
	console.log(id);
	try {
		// verificando si existe el usuario con el id
		pool.query('SELECT * from album where id_user=? ;', [ id ], function(err, result) {
			if (err) throw err;
			if (result.length != 0) {
				//actualizo el registro en db
				res.status(201).json({ msj: result, error: null });
			} else {
				res.status(409).json({ msj: 'Albums dont Exists', error: true });
			}
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/postalbum', async (req, res) => {
	const { id, name } = req.body;
	console.log(id);
	try {
		// verificando si existe el usuario con el id
		pool.query('INSERT into album (id_user,name) values (?,?);', [ id, name ], function(err, result) {
			if (err) throw err;
			//actualizo el registro en db
			res.status(201).json({ msj: result, error: null });
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/deletealbum', async (req, res) => {
	const { id } = req.body;
	console.log(id);
	try {
		// verificando si existe el usuario con el id
		pool.query('delete from albumfoto  where id_album=? ;', [ id ], function(err, result) {
			if (err) throw err;
			pool.query('delete from album where id=? ;', [ id ], function(err, result) {
				if (err) throw err;
				res.status(201).json({ msj: result, error: null });
			});
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/getimages', async (req, res) => {
	const { id } = req.body;
	try {
		// verificando si existe el usuario con el id
		pool.query(
			'SELECT f.id ,f.url ,f.descripcion from albumfoto a inner join foto f on f.id = a.id_foto inner join album a2 on a2.id = a.id_album  where a2.id_user =? ;',
			[ id ],
			function(err, result) {
				if (err) throw err;
				if (result.length != 0) {
					//actualizo el registro en db
					res.status(201).json({ msj: result, error: null });
				} else {
					res.status(409).json({ msj: [], error: true });
				}
			}
		);
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

router.post('/deleteimage', async (req, res) => {
	const { id } = req.body;
	console.log(id), 'user';
	try {
		// verificando si existe el usuario con el id
		pool.query('delete from albumfoto where id_foto=? ;', [ id ], function(err, result) {
			if (err) throw err;
			pool.query('delete from foto where id=? ;', [ id ], function(err, result) {
				if (err) throw err;
				res.status(201).json({ msj: result, error: null });
			});
		});
	} catch (er) {
		//console.log(er);
		res.status(500).json({ msj: 'error when update user info', error: er });
	}
});

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// Imports the Google Cloud Node.js client library

//uploadFromMemory().catch(console.error);
async function uploadFile(nombreUsuario, miFile, nombreFile) {
	try {
		//obteniendo la base64 sin el inicio, quita esto (no importa el tipo archivo): data:image/png;base64,
		let inicio = miFile.base.indexOf(',') + 1;
		let fin = miFile.base.length;
		const newBase64 = await miFile.base.substring(inicio, fin);

		//convirtiendo a base64
		let buff = await new Buffer.from(newBase64, 'base64');
		//parametros para s3
		// The ID of your GCS bucket
		const bucketName = 'mypicz-storage';

		// The contents that you want to upload
		const contents = buff;

		// The new ID for your GCS file
		const destFileName = nombreUsuario + '/' + nombreFile;

		//verificando si existe archivo, en una carpeta con el mismo nombre y extension
		//inserto en s3
		await storage.bucket(bucketName).file(destFileName).save(contents);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
module.exports = router;
