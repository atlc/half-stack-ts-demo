import * as fs from 'fs';
import { v4 as uuid_v4 } from 'uuid';

import { Pizza_Response, IEmployee } from '../../types';

const employee_store = 'employee_data.json';

const get_employees = () => {
    return new Promise<IEmployee[]>((resolve, reject) => {
        fs.readFile(employee_store, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(JSON.parse(data.toString()));
            }
        })
    })
}

const get_employee = (id: IEmployee['id']) => {
    return new Promise<IEmployee>((resolve, reject) => {
        fs.readFile(employee_store, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const all_employees: IEmployee[] = JSON.parse(data.toString());
                const single_employee = all_employees.find(emp => emp.id === id);
                if (single_employee) {
                    resolve(single_employee);
                } else {
                    reject('No employee with that ID found');
                }
            }
        })
    })
}

const create_employee = (emp: IEmployee) => {
    return new Promise<Pizza_Response>(async (resolve, reject) => {
        const newEmp = emp;
        const noFalsyProperties = Object.values(newEmp).every(val => val);

        if (noFalsyProperties) {
            const currentEmployees = await get_employees();
            newEmp.id = uuid_v4();
            currentEmployees.push(newEmp);

            fs.writeFile(employee_store, JSON.stringify(currentEmployees), (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve({
                        message: 'Success, the new employee was written to the database successfully.',
                        created_id: newEmp.id
                    });
                }
            });
        } else {
            reject('Bad data inputted!');
        }
    });
}

const update_employee = async (id: IEmployee['id'], employee: IEmployee) => {
    const updatedEmployee = employee;
    const currentEmployees = await get_employees();
    const employeeIndex = currentEmployees.findIndex(emp => emp.id === id);

    updatedEmployee.id = id;
    currentEmployees[employeeIndex] = updatedEmployee;

    return new Promise<Pizza_Response>((resolve, reject) => {
        fs.writeFile(employee_store, JSON.stringify(currentEmployees), (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (!employeeIndex) {
                    reject('No employee with that ID was found')
                } else {
                    resolve({ message: 'Success, the employee was updated successfully.', created_id: 'Doodoo' });
                }
            }
        });
    });
}

const remove_employee = async (id: IEmployee['id']) => {
    const currentEmployees = await get_employees();
    const employeeIndex = currentEmployees.findIndex(emp => emp.id === id);

    currentEmployees.splice(employeeIndex);

    return new Promise<Pizza_Response>((resolve, reject) => {
        fs.writeFile(employee_store, JSON.stringify(currentEmployees), (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (!employeeIndex) {
                    reject('No employee with that ID was found')
                } else {
                    resolve({ message: 'Success, the employee was deleted successfully.' });
                }
            }
        });
    });
}

export default {
    get_single_employee: get_employee,
    get_all_employees: get_employees,
    create_employee,
    update_employee,
    remove_employee
}