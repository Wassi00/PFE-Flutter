const sequelize = require("./config/database");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});
