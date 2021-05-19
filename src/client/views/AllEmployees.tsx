import React, { useState, useEffect } from 'react';
import { IEmployee } from '../../types';
import { Link } from 'react-router-dom';

const AllEmployees = () => {

    const [employees, setEmployees] = useState<IEmployee[]>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/employees')
            .then(res => res.json())
            .then(empz => setEmployees(empz))
            .catch(e => alert(e));
    }, []);

    if (!employees) return <></>;

    return (
        <div className='container'>
            <div className="row">
                {employees.map(emp => (
                    <div className='col-md-5 m-2' key={emp.id}>
                        <div className="card">
                            <div className="card-header">
                                <Link to={`/employees/${emp.id}`} className='text-primary'>{emp.name}</Link>
                            </div>
                            <div className="card-body">
                                <p>@{emp.username}</p>
                                <p>email: {emp.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllEmployees
