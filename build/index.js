"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _typeormPagination = require("typeorm-pagination");

require("reflect-metadata");

require("./container");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

require("./database");

require("express-async-errors");

var _celebrate = require("celebrate");

var _errors = _interopRequireDefault(require("./errors"));

var _routes = _interopRequireDefault(require("./routes"));

var _upload = _interopRequireDefault(require("./config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import-helpers/order-imports */

/* eslint-disable @typescript-eslint/no-unused-vars */
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_typeormPagination.pagination);
app.use('/files', _express.default.static(_upload.default.directory));
app.use(_routes.default);
app.use((0, _celebrate.errors)()); // eslint-disable-next-line consistent-return

app.use((error, req, res, next) => {
  if (error instanceof _errors.default) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error
  });
});