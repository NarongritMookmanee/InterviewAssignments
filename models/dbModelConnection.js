import mysql from 'mysql2/promise';
import { dbConfig } from "../configs/mySqlConfig.js"

export default class {
  async _init_poolConnection() {
    return await mysql.createPool(dbConfig)
  }

  async _getUsers(pool) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`SELECT * FROM user`);
    return rows;
  }

  async _getUserById(pool, id) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`SELECT * FROM user WHERE id = ${id}`);
    return rows;
  }

  async _createUser(pool, values) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`
          INSERT INTO users.user (email, password, username, role) 
          VALUES (
            '${values.email}', 
            '${values.password}', 
            '${values.username}', 
            '${values.role}
          ');
      `);
    return rows;

  }

  async _updateUser(pool, id, values) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`
          UPDATE users.user 
          SET 
            email = '${values.email}', 
            password = '${values.password}', 
            username = '${values.username}', 
            role = '${values.role}' 
          WHERE id = ${id};
      `);
    return rows;
  }

  async _deleteUser(pool, id) {
    if (!pool) {
      throw new Error("Database connection not initialized");
    }
    const [rows] = await pool.query(`DELETE FROM users.user WHERE (id = '${id}');`);
    return rows;
  }
} 