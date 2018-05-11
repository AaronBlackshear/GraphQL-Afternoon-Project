const { buildSchema } = require("graphql");
const { graphqlExpress } = require("apollo-server-express");
// const axios = require("axios");

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
    // this.users = this.getUsers();
  }

  //   getUsers(req, res) {}
}

const schema = buildSchema(
  `
    type User {
        id: Int!
        username: String
        password: String
    },
    type Query {
        users: [User]
    }
    `
);

const root = {
  users(_, req) {
    return req.app.get('db')
      .get_users()
      .then(response => response.map(val => new User(val)))
      .catch(console.log);
  }
};

module.exports = {
  schema,
  root
};
