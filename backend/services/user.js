const {Storage} = require('@google-cloud/storage');
const pool = require('../databases_connections/mysql_connection');
const storage = new Storage();

function _signup(name,password,email,biografia,profile_photo,res){
    pool.query("SELECT * FROM user WHERE email=? ;", [email], function(err,result){
        console.log(result)
        if (err) throw err;
        if (result.length == 0) {
            uploadFile(name,profile_photo,profile_photo.name)
            let path = 'https://storage.googleapis.com/mypicz-storage/'+name+"/"+profile_photo.name;
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
}

function login(user,password,res){
    const email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    const isEmail = email.exec(user);
    let query="";
    if (!isEmail) {
      query = "SELECT * FROM user WHERE name=?;"
      console.log('El usuario quiere ingresar con nombre: ' + user);
    } else {
      query = "SELECT * FROM user WHERE email=?;"
      console.log('El usuario quiere ingresar con correo: ' + user);
    }
    // verificando correo 
    pool.query(query, [user], function(err,result){
        if (err) throw err;
        if (result.length > 0) {
            const data = result[0];
            const SavePassword = data.password;
            const RecivedPassword = password;
            //console.log(data)
            if (SavePassword==RecivedPassword) {
                res.status(200).json({msj:data, error: null});
            } else {
                res.status(401).json({msj:'Incorrect password', error: true}); 
            }
        }else{
            res.status(404).json({msj:'User not found in database', error: true})
        }
    });
}

async function uploadFile(nombreUsuario,miFile,nombreFile) {
    try {
      //obteniendo la base64 sin el inicio, quita esto (no importa el tipo archivo): data:image/png;base64, 
      let inicio = miFile.base.indexOf(',')+1;
      let fin = miFile.base.length;
      const newBase64 = await miFile.base.substring(inicio,fin);
  
      //convirtiendo a base64
      let buff = await new Buffer.from(newBase64, 'base64');
      //parametros para s3 
      // The ID of your GCS bucket
      const bucketName = 'mypicz-storage';
  
      // The contents that you want to upload
      const contents = buff;
  
      // The new ID for your GCS file
      const destFileName = nombreUsuario+"/"+nombreFile;
  
      //verificando si existe archivo, en una carpeta con el mismo nombre y extension
      //inserto en s3
      await storage.bucket(bucketName).file(destFileName).save(contents);
      return true;
  } catch (error) {
      console.log(error)
      return false;
  }
}

module.exports = {_signup,login,uploadFile};
  