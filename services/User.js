const { Mongo } = require("../database");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new Mongo();
  }

  getUsers = async query => {
    if (!query) {
      query = {};
    }
    const users = await this.mongoDB.getAll(query, this.collection);
    return users;
  };

  getUser = async email => {
    const user = await this.mongoDB.get(email, this.collection);
    return user;
  };

  createUser = async data => {
    data.password = await bcrypt.hash(data.password, 1);
    await this.mongoDB.create(data, this.collection);
  };

  updateUser = async (id, data) => {
    const user = await this.mongoDB.update(id, data, this.collection);
    return user;
  };

  deleteUser = async id => {
    const user = await this.mongoDB.delete(id, this.collection);
    return user;
  };
}

module.exports = UsersService;
