"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = bcrypt.hashSync(process.env.PASSWORD, 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "irwantoadmin@yahoo.com",
          password: hash,
          fullName: "Irwanto",
          gender: "male",
          phone: 6287838543675,
          address: "Jln. Marvel Universe, RT.21 RW.69",
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
