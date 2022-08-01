"use strict";

var _typeorm = require("typeorm");

(0, _typeorm.getConnectionOptions)().then(options => {
  const newOptions = options;
  newOptions.host = 'database'; // Nome dado ao service do banco de dados
  // Cria a coneção com o banco de dados

  (0, _typeorm.createConnection)({ ...options
  });
});