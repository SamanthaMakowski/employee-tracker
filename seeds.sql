INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 95000, 1),
('Accountant', 70000, 2),
('HR Manager', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Anderson', 1, NULL),
('Bob', 'Brown', 2, NULL),
('Clara', 'Cruz', 3, NULL),
('David', 'Davis', 1, 1); 
