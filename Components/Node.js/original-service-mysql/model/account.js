module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    type: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
  });
  return Account;
};
