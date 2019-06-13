const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const userData = [];

class User {
  constructor(firstName, lastName, password, email, address) {
    this.id = this.generateId();
    this.first_name = firstName;
    this.last_name = lastName;
    this.password = this.encrypt(password);
    this.email = email;
    this.address = address;
    this.is_admin = false;
  }

  encrypt(value) {
    const hash = bcrypt.hashSync(value, 10);
    return hash;
  }

  generateId() {
    return uuid.v1();
  }

  static decrypt(hash, value) {
    if (bcrypt.compareSync(value, hash)) {
      return true;
    }
    return false;
  }

  static logInUser(authenticatingUser) {
    const user = this.findUser(authenticatingUser);

    const response = {
      authenticated: false,
      data: null
    };
    if (user !== null) {
      const result = this.decrypt(user.password, authenticatingUser.password);

      if (result) {
        response.authenticated = true;

        //Creating authentication and authorization Token
        const token = jwt.sign(
          { userId: user.id, role: user.is_admin },
          "RANDOM_TOKEN",
          {
            expiresIn: "24h"
          }
        );

        user.token = token;

        response.data = user;
      }
    } else {
      response.authenticated = false;
      response.data = "Incorrect Username or Password";
    }
    return response;
  }

  static saveUser(user) {
    userData.push(user);

    // Return last saved Record
    return userData[userData.length - 1];
  }

  static getUsers() {
    return userData;
  }

  static findUser(user) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].email === user.email) {
        return userData[i];
      }
    }
    return null;
  }

  static findUserByEmail(email) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].email === email) {
        return userData[i];
      }
    }
    return null;
  }

  static findUserById(user_id) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === user_id) {
        return userData[i];
      }
    }
    return null;
  }
}

module.exports = User;
