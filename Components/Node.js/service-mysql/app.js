require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const { restart } = require("nodemon");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ark@n0!d4",
  database: "nodemysql",
});

// Connect
// NOTE:
// In a MySql terminal, run:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourNewPassword';
// FLUSH PRIVILEGES;
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

//Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Database created...");
  });
});

//Create table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Table created...");
  });
});

//Insert posts
app.get();

app.listen(process.env.PORT, () => {
  console.log("Server started on " + process.env.PORT);
});
