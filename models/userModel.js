const bcrypt = require('bcrypt');
const db = require('../db/db');

class UserModel {
  static async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.one(
      'INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
  }

  static async getUser(userId) {
    return db.oneOrNone('SELECT * FROM "User" WHERE id = $1', [userId]);
  }
  static async getUserByUsername(username) {
    return db.oneOrNone('SELECT * FROM "User" WHERE username = $1', [username]);
  }
  static async verifyPassword(userId, password) {
    const user = await this.getUser(userId);
    return bcrypt.compare(password, user.password);
  }
}

module.exports = UserModel;
