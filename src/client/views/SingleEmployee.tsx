import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IEmployee } from '../../types';

const SingleEmployee = () => {

    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<IEmployee>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/employees/' + id)
            .then(res => res.json())
            .then(empz => setEmployee(empz))
            .catch(e => alert(e));
    }, [id]);

    if (!employee) return <></>;

    return (
        <div className='col-md-10 m-2' key={employee.id}>
            <div className="card">
                <div className="card-header">
                    {employee.name}
                </div>
                <div className="card-body">
                    <p>@{employee.username}</p>
                    <p>email: {employee.email}</p>
                    <div className="card-footer">
                        <p>{employee.address.street}, {employee.address.city}, {employee.address.zipcode}</p>
                    </div>
                    <Link to='/employees'>Go back to employees</Link>
                </div>
            </div>
        </div>
    )
}

export default SingleEmployee
