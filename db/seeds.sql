USE employeetracker_db;

INSERT INTO department (name)
VALUES ("Management"),
       ("Accounting"),
       ("Human Resources"),
       ("Sales"),
       ("Marketing");



INSERT INTO roles (`title`, `salary`, `department_id`)
VALUES  ('Pres', 500000.00, 1),
        ('CFO', 250000.00, 1),
        ('Sr Accountant', 150000.00, 2),
        ('Jr Accountant', 75000.00, 2),
        ('HR Manager', 150000.00, 1),
        ('HR Rep', 50000.00, 3),
        ('Sales Rep', 50000.00, 4),
        ('Marketing Manager', 100000.00, 1),
        ('Marketing Rep', 50000.00, 5),
        ('Sales Manager', 100000.00, 1);






INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Smith", 1, NULL),
        ("Sanaya", "Murillo", 2, 1),
        ("Josef", "Wilkinson", 4, 2),
        ("Lilly", "Dotson", 3, 2),
        ("Connor", "Goodwin", 5, 1),
        ("Izabella", "Steele", 6, 5),
        ("Reece", "Graves", 8, 1),
        ("Zhane", "Wang", 9, 8),
        ("Jeanne", "Green", 7, 11),
        ("Toby", "Martin", 7, 11),
        ("Noah", "Rudd", 10, 6),
        ("Lilian", "Dillon", 6, 5);