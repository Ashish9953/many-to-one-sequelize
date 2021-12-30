'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicleName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references:{
          model:
          {
            tableName:"Customers"
          },
          key:"id"
        },
        allowNull:false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicles');
  }
};