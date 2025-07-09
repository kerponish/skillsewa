const pool = require("../config/db");

const initializeUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      dob DATE NOT NULL
    )
  `);
};

const createUser = async (fullName, email, hashedPassword, dob) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password, dob)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [fullName, email, hashedPassword, dob]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = {
  initializeUserTable,
  createUser,
  findUserByEmail,
};
