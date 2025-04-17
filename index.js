const inquirer = require('inquirer');
const {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} = require('./db/queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit'
    ]
  });

  if (action === 'View All Departments') {
    const departments = await getDepartments();
    console.table(departments);
    return mainMenu();
  }

  if (action === 'View All Roles') {
    const roles = await getRoles();
    console.table(roles);
    return mainMenu();
  }

  if (action === 'View All Employees') {
    const employees = await getEmployees();
    console.table(employees);
    return mainMenu();
  }

  if (action === 'Add Department') {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    });
    await addDepartment(name);
    return mainMenu();
  }

  if (action === 'Add Role') {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Role title:' },
      { type: 'input', name: 'salary', message: 'Role salary:' },
      { type: 'input', name: 'department_id', message: 'Department ID:' }
    ]);
    await addRole(answers.title, answers.salary, answers.department_id);
    return mainMenu();
  }

  if (action === 'Add Employee') {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'First name:' },
      { type: 'input', name: 'lastName', message: 'Last name:' },
      { type: 'input', name: 'roleId', message: 'Role ID:' },
      { type: 'input', name: 'managerId', message: 'Manager ID (optional):' }
    ]);
    await addEmployee(
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId || null
    );
    return mainMenu();
  }

  if (action === 'Update Employee Role') {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'employeeId', message: 'Employee ID:' },
      { type: 'input', name: 'roleId', message: 'New Role ID:' }
    ]);
    await updateEmployeeRole(answers.employeeId, answers.roleId);
    return mainMenu();
  }

  process.exit();
};

mainMenu();
