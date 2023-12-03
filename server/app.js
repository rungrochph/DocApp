var express = require("express");
var app = express();
// const axios = require('axios')
var cors = require("cors");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const secret = "Doc_app";

app.use(cors());

const mysql = require("mysql2");
const port = 3030;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "docapp_schema",
});

//regis api
app.get("/getuserlist", jsonParser, function (req, res) {
  db.query(`SELECT * from da_users`, function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", results: results });
  });
});

//regis api
app.post("/register", jsonParser, function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const position = req.body.position;
  const salary = req.body.salary;
  db.query(
    "INSERT INTO da_users( email, password, fname, lname, position, salary) VALUES (?,?,?,?,?,?)",
    [email, password, fname, lname, position, salary],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

app.post("/login", jsonParser, function (req, res, next) {
  db.query(
    "SELECT * FROM da_users WHERE email =?",
    [req.body.email],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//insert vacation form
app.post("/insertvac", jsonParser, (req, res) => {
  const username = req.body.username;
  const position = req.body.position;
  const workgroup = req.body.workgroup;
  const accumulated_leave = req.body.accumulated_leave;
  const total_date_num = req.body.total_date_num;
  const con_name = req.body.con_name;
  const passed_leave_num = req.body.passed_leave_num;
  const now_leave_num = req.body.now_leave_num;
  const total_date = req.body.total_date;
  const con_tel = req.body.con_tel;
  db.query(
    `INSERT INTO da_vacation (username, position, workqroup, accumulated_leave, total_date_num, con_name, passed_leave_num, now_leave_num, total_date, con_tel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      username,
      position,
      workgroup,
      accumulated_leave,
      total_date_num,
      con_name,
      passed_leave_num,
      now_leave_num,
      total_date,
      con_tel
    ],
    function (err) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

app.get("/users", (req, res) => {
  db.query(`SELECT * FROM da_users`, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/", (req, res) => res.send("Hello World"));

app.get("/test", (req, res) => res.send("Test...."));

app.listen(port, () => {
  console.log(`serveruning on port ${port}`);
});
