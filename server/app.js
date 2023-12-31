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
      res.json({ status: "ok", message: "login sucess" ,token, results:results});
      var token = jwt.sign({email : results[0]. email}, secret, {expiresIn: '1h'});
    }
  );
});


// Authen 
app.post("/authen", jsonParser, function (req, res, next) {
  try{
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token,secret)
    res.json({ status: "ok", decoded});
  }catch(err){
    res.json({ status: "error", message:err.message });
  }
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
      con_tel,
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

app.get("/getData", jsonParser, function (req, res) {
  db.query(
    `SELECT dv.id as id ,dv.date as date
,dv.username as username
,dv.position as position
,dv.now_leave_num as now_leave_num
,ds.name as status_name
    FROM da_vacation as dv 
    LEFT JOIN da_doc_status as ds ON dv.status = ds.id`,
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

//ลบข้อมูลผู้ใช้โดยอ้างอิงจาก ID
app.post("/user/deleteDoc/id", jsonParser, function (req, res, next) {
  const id = req.body.id;
  db.query(`DELETE FROM da_vacation WHERE id=?`, [id], function (err) {
    if (err) {
      res.json({ status: "error", message: err });

      return;
    }
    res.json({ status: "ok" });
  });
});

//ดึงข้อมูลStatus
app.get("/calender/getstatus", jsonParser, function (req, res, next) {
  db.query(
    `SELECT id, name FROM da_doc_status`,
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});
//ดึง sumstatus where id
app.post("/getsumstatus", jsonParser, function (req, res, next) {
  const id = req.body.id;
  db.query(
    `SELECT COUNT(*) as sum_item FROM da_vacation WHERE status = ?`,
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

app.post("/searchData", jsonParser, async function (req, res) {
  try {
    const startDate = req.body.startdate;
    const endDate = req.body.enddate;
    const status = req.body.statusId;

    const datatoget = {
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT dv.id as id 
        ,dv.date as date
        ,dv.username as username
        ,dv.position as position
        ,dv.now_leave_num as now_leave_num
        ,ds.name as status_name
        ,dv.status as status_id
        FROM da_vacation as dv 
        LEFT JOIN da_doc_status as ds ON dv.status = ds.id 
        WHERE dv.date BETWEEN ? AND ? AND dv.status = ?`,
        [startDate, endDate, status],
        function (err, results) {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });

    res.json({ status: "ok", results: results });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// update status to 2 รอรับเข้าระบบ
app.post("/sentdoc/updatestatus", jsonParser, function (req, res) {
  const id = req.body.id;
  db.query(
    `UPDATE da_vacation SET status = '2'
        WHERE id =? `,
    [id],
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

// update status to 2 รอรับเข้าระบบ
app.post("/getData/id", jsonParser, function (req, res) {
  const id = req.body.id;
  db.query(
    `SELECT * FROM da_vacation WHERE id =?`,
    [id],
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

app.post("/update/status/id", jsonParser, function (req, res) {
  const id = req.body.id;
  const statusId = req.body.statusId;
  db.query(
    `UPDATE da_vacation SET status = ?
        WHERE id =? `,
    [statusId, id],
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

app.get("/getData/App", jsonParser, function (req, res) {
  db.query(
    `SELECT dv.id as id,
    dv.date as date,
    dv.username as username,
    dv.position as position,
    dv.now_leave_num as now_leave_num,
    ds.name as status_name,
    dv.status as status
FROM da_vacation as dv 
LEFT JOIN da_doc_status as ds ON dv.status = ds.id 
WHERE dv.status != '1'`,
    function (err, results) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", results: results });
    }
  );
});

app.listen(port, () => {
  console.log(`serveruning on port ${port}`);
});
