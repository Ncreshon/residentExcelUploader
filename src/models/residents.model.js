module.exports = (sequelize, Sequelize) => {
    const Residents = sequelize.define("residents", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      movein_date: {
        type: Sequelize.STRING
      },
      lease_term: {
        type: Sequelize.INTEGER
      },
      apartment_number: {
        type: Sequelize.INTEGER
      },
      pets: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Residents;
  };