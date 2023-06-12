const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config()

app.use(cors({
  origin: 'http://localhost:3000'
}));

// console.log(process.env.PASSWORD)

const db = mysql.createPool({
  port: process.env.port,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.use(express.json());

// db.connect(function(err) {
//   if (err) {
//     console.error('⚠️  Error Connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('✅  Connected as ID: ' + connection.threadId);
// });

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  console.log(id);
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
        
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("✅ Server running on port: 3001");
});
