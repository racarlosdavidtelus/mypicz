const functions = require('@google-cloud/functions-framework');
const pool = require('./databases_connections/mysql_connection');
var cors = require('cors')

var corsOptions = {
    origin: '*'
}

functions.http('userHttp',function(req, res) {
  const {userId}=req.body;
  
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set("Content-Type", "application/json")
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', '*');
    //res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
   
  
  try {
      pool.query("SELECT * FROM user WHERE id=? ;", [userId], function(err,result){
          if (err) throw err;
          if (result.length == 0) {
              res.status(403).json({msj: 'User not found in the database',error: true});
          }else{
                const data = result[0];
                res.status(200).json({msj: {
                    name: data.name,
                    email: data.email,
                    biografia: data.biografia,
                    url_photo: data.url_photo },
                    error: null}
                );
          }
        });
  } catch (er) {
      //console.log(error);
      res.status(500).json({msj: "error", error: er});
  }}
});