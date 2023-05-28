"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM "users" LIMIT 1;`
    );

    const transactions = [...Array(5)].map((_, index) => {
      return {
        id: faker.string.uuid(),
        user_id: user[0][0].id,
        code: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
        date: faker.date.anytime(),
        is_paid: faker.datatype.boolean(),
        created_at: faker.date.anytime(),
      };
    });

    await queryInterface.bulkInsert("transactions", transactions);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
