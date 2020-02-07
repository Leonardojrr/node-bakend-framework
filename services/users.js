const { Mongo } = require("../database");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new Mongo();
  }

  async getUsers(query) {
    if (!query) {
      query = {};
    }
    const users = await this.mongoDB.getAll(query, this.collection);
    return users;
  }

  async getUser(email) {
    const user = await this.mongoDB.get(email, this.collection);
    return user;
  }

  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const userid = await this.mongoDB.create(data, this.collection);
    return userid;
  }

  async updateUser(id, data) {
    const user = await this.mongoDB.update(id, data, this.collection);
    return user;
  }

  async deleteUser(id) {
    const user = await this.mongoDB.delete(id, this.collection);
    return user;
  }
}

module.exports = UsersService;