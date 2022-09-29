const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const { response } = require("express");
const consoleTable = import('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    name: "init",
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
  inquirer.prompt(startPrompt).then((response) => {
    if (response.choice == "View All Departments") {
      viewDepartments();
    } else if (response.choice == "View All Roles") {
      viewRoles();
    } else if (response.choice == "View All Employees") {
      viewRoles();
    } else if (response.choice == "Exit") {
      exitApp();
    }
  });
}

const  viewDepartments = () => {
  const sql = `
  SELECT * 
  FROM department;`;

  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }

    console.log("hit app", table);

    console.table(res);


    return startApp()
  });
}

const viewRoles = () => {
  const sql = `
  SELECT roles.id, title, salary, department.name AS "department name"
  FROM roles
  JOIN department
  ON department_id = department.id;`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    console.table(data);
    startApp();
  });
}

const exitApp = () => {
  console.log('Thank you, goodbye!')
  process.exit()
}

// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
