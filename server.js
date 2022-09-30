const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const app = express();

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "docker2",
  database: "employeetracker_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`Employee Tracker Connected`);
  startApp();
});

const startPrompt = [
  {
    name: "start",
    type: "list",
    message: "What action would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Exit",
    ],
  },
];

const startApp = () => {
  inquirer.prompt(startPrompt).then((results) => {
    
    if (results.start == `View All Departments`) {
      viewDepartments();
    } else if (results.start == "View All Roles") {
      viewRoles();
    } else if (results.start == "View All Employees") {
      viewEmployees();
    } else if (results.start == "Exit") {
      exitApp();
    }
  });
};

function viewDepartments() {
  const sql = "SELECT * FROM department;";

  db.query(sql, (err, response) => {
    if (err) {
      throw err;
    }

    console.table(response);

   startApp();
  });
}

function viewRoles() {
  const sql = `
  SELECT roles.id, title, salary, department.name AS "department name"
  FROM roles
  JOIN department
  ON department_id = department.id;`;

  db.query(sql, (err, response) => {
    if (err) throw err;

    console.table(response);
    startApp();
  });
}

const exitApp = () => {
  console.log("Thank you, goodbye!");
  process.exit();
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
