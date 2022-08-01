"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../config/auth"));

var _errors = _interopRequireDefault(require("../../errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _errors.default('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' '); // para espacar o tokem

  try {
    const decodeToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decodeToken;
    req.user = {
      id: sub
    };
    return next();
  } catch (error) {
    throw new _errors.default('Invalid JWT Token.');
  }
} // funcao para autenticar usuarios