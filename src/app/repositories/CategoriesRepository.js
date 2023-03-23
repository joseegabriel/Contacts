const db = require('../../database/')

class CategoriesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name')
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return row;
  }

  async create({ name, phone }) {
    const [row] = await db.query(`
    INSERT INTO categories(name, phone)
    VALUES($1, $2)
    RETURNING *
    `, [name, phone]);

    return row
  }

  async update(id, {
    name,
  }) {
    console.log(id)
    const [row] = await db.query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    // row = undefined = falsy;
    return deleteOp;
  }
}

module.exports = new CategoriesRepository
