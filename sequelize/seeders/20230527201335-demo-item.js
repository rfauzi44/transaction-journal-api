"use strict";
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transactions = await queryInterface.sequelize.query(`SELECT id FROM "transactions";`, { type: queryInterface.sequelize.QueryTypes.SELECT });
    const transactionIds = transactions.map(transaction => transaction.id);
  
    const items = [...Array(25)].map((_, index) => {
      return {
        id: faker.string.uuid(),
        transaction_id: faker.helpers.arrayElement(transactionIds),
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 5000, max: 500000, dec: 0 }),
        qty: faker.number.int({ min: 1, max: 10 }),
        created_at: faker.date.anytime(),
      };
    });
  
    await queryInterface.bulkInsert("items", items);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("items", null, {});
  },
};
