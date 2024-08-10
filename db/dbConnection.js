const mongoose = require("mongoose");
const { db } = require("../configurations/config");

class DBConnection {
  static #mongooseInstance = null;
  constructor() {
    if (DBConnection.#mongooseInstance === null) {
      this.connect();
      DBConnection.#mongooseInstance = this;
    }
  }
  static getInstance() {
    if (!DBConnection.#mongooseInstance) {
      DBConnection.#mongooseInstance = new DBConnection();
    }
    return DBConnection.#mongooseInstance;
  }
  async connect() {
    try {
      this.connection = await mongoose.connect(db.uri);
    } catch (error) {
        throw error
    }
  }

  // Getter for the connection object
  getConnection() {
    return this.connection;
  }
}

module.exports = DBConnection;

