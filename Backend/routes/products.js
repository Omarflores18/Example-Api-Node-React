var express = require('express');
var router = express.Router();

const dbConnection = require("../dbConnection");

/* post users listing. */
router.post('/', function (req, res, next) {

  const sku = req.body.sku || 0;

  var header = req.headers['authorization'] || '';
  var token = header.split(/\s+/).pop() || '';
  var auth = new Buffer.from(token, 'base64').toString();
  var parts = auth.split(/:/);

  if (parts[1] === "123") {
    const connection = dbConnection();

    connection.query('select * from products where sku =' + sku, (err, result, fields) => {

      if (result.length > 0) {
        res.json({
          data: result
        });
      } else {

        let dataArray = [
          { codigo: "", sku: "", descripcion: "No se encontro el SKU" },
        ];
        res.json({
          data: dataArray
        });
      }

    });
  }
  else {
    return res.sendStatus(403);
  }
});

module.exports = router;
