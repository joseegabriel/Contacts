const { v4 } = require('uuid');

const db = require('../../database/')

let contacts = [
  {
    id: v4(),
    name: 'Neto',
    email: 'jose@mail.com',
    phone: '40028922',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Gallinari',
    email: 'gallinari@mail.com',
    phone: '4002kk8922',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id != id);
      resolve();
    })
  }

  async create({
    name, email, phone, category_id
  }) {
    // SQL Injection
    const { row } = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();