const db = require("../configs/db");
model = {};

model.addTransaction = async (
  transaction_id,
  user_id,
  code,
  date,
  is_paid,
  items
) => {
  try {
    await db.query("BEGIN");

    await db.query(
      `INSERT INTO transactions (id, user_id, code, date, is_paid, created_at) VALUES($1, $2, $3, $4, $5, now())`,
      [transaction_id, user_id, code, date, is_paid]
    );

    for (const item of items) {
      await db.query(
        `INSERT INTO items (id, transaction_id, name, price, qty, created_at) VALUES ($1, $2, $3, $4, $5, now())`,
        [item.id, transaction_id, item.name, item.price, item.qty]
      );
    }

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

model.getTransactionAll = async (user_id) => {
  try {
    const data = await db.query(
      `SELECT t.id, t.code, t.date, t.is_paid, t.created_at, i.id AS item_id, i.name AS item_name, i.price AS item_price, i.qty AS item_qty
       FROM transactions AS t JOIN items AS i ON t.id = i.transaction_id WHERE user_id = $1 ORDER BY t.created_at DESC`,
      [user_id]
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
};

model.getTransactionID = async (user_id, transaction_id) => {
  try {
    const data = await db.query(
      `SELECT t.id, t.code, t.date, t.is_paid, t.created_at, i.id AS item_id, i.name AS item_name, i.price AS item_price, i.qty AS item_qty
       FROM transactions AS t JOIN items AS i ON t.id = i.transaction_id WHERE user_id = $1 AND transaction_id = $2`,
      [user_id, transaction_id]
    );
    return data.rows;
  } catch (error) {
    throw error;
  }
};

model.updateTransaction = async (
  transaction_id,
  user_id,
  code,
  date,
  is_paid,
  items
) => {
  try {
    await db.query("BEGIN");
    await db.query(
      `UPDATE transactions SET code = $1, date = $2, is_paid= $3, updated_at = now() WHERE user_id = $4 AND id = $5`,
      [code, date, is_paid, user_id, transaction_id]
    );

    await db.query(`DELETE FROM items WHERE transaction_id = $1`, [
      transaction_id,
    ]);

    for (const item of items) {
      await db.query(
        `INSERT INTO items (id, transaction_id, name, price, qty, created_at) VALUES ($1, $2, $3, $4, $5, now())`,
        [item.id, transaction_id, item.name, item.price, item.qty]
      );
    }

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

model.deleteTransaction = async (user_id, transaction_id) => {
  try {
    await db.query(`DELETE FROM transactions WHERE user_id = $1 AND id = $2`, [
      user_id,
      transaction_id,
    ]);
  } catch (error) {
    throw error;
  }
};

module.exports = model;
