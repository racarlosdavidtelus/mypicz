const functions = require('@google-cloud/functions-framework');
const pool = require('./databases_connections/mysql_connection');

functions.http('userHttp', function(req, res) {
  const {userId}=req.body;
  try {
      pool.query("SELECT * FROM user WHERE id=? ;", [userId], function(err,result){
          if (err) throw err;
          if (result.length == 0) {
              res.status(403).json({msj: 'User not found in the database',error: true});
          }else{
              res.status(200).json({msj: result,error: null});
          }
        });
  } catch (er) {
      //console.log(error);
      res.status(500).json({msj: "error", error: er});
  }
});