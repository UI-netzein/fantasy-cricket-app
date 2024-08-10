const express = require("express");
const app = express();
const { app: appConfig } = require("./configurations/config");

const DBConnection = require("./db/dbConnection");
const routes = require('./routes/index');
const notFound = require("./middleware/pathNotFound");

app.use(express.json());

app.use(routes);

app.use(notFound)
async function run() {
  try {
    const dbConnection = DBConnection.getInstance();
    await dbConnection.connect();
    const connection = dbConnection.getConnection();
    return "Databse Connected";
  } catch (error) {
    throw error;
  }
}

app.listen(appConfig.port, () => {
  run()
    .then((res) => {
      console.log(res);
      console.log(`App listening on port ${appConfig.port}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
