"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _usersEntitie = _interopRequireDefault(require("../../entities/usersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FakeUsersRepository {
  constructor() {
    _defineProperty(this, "users", [{
      id: '297a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Drica',
      email: 'drica@gmail.com',
      password: '12345678',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null
    }, {
      id: '197a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Drica',
      email: 'teste2010@gmail.com',
      password: '12345678',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null
    }, {
      id: '997a07e0-c937-48a3-b8dd-1c68f994d809',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: 'admin09',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null
    }, {
      id: '117a07e0-c937-48a3-b8dd-1c68f994d801',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: 'admin09',
      avatar: 'teste.jpeg',
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null
    }]);
  }

  async create({
    name,
    email,
    password
  }) {
    const user = new _usersEntitie.default();
    user.id = (0, _uuid.v4)();
    user.name = name;
    user.email = email;
    user.password = password;
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  async remove(user) {}

  async findAll() {
    return undefined;
  }

  async findByName(name) {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  async findById(id) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;