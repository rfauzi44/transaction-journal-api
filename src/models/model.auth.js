const db = require("../configs/db");
const model = {};

model.register = async (id, username, email, name, password, gender) => {
  try {
    const data = await db.query(
      `INSERT INTO users (id, username, email, name, password, gender, created_at) VALUES($1, $2, $3, $4, $5, $6, now()) RETURNING id, username, email, name, gender, created_at`,
      [id, username, email, name, password, gender]
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
};

model.login = async (username_email) => {
  try {
    const data = await db.query(
      `SELECT id, username, email, name, password, gender, created_at FROM users WHERE username=$1 OR email=$1 `,
      [username_email]
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
};

model.getMe = async (active_user_id) => {
  try {
    const data = await db.query(
      `SELECT id, username, email, name, gender, created_at FROM users
       WHERE id = $1
       `,
      [active_user_id]
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = model;
