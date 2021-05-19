import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-secondary p-2">
            <NavLink className='btn btn-outline-success text-dark m-3' activeClassName='btn-success text-white' exact to='/'>Home</NavLink>
            <NavLink className='btn btn-outline-success text-dark m-3' activeClassName='btn-success text-white' exact to='/employees'>Employees</NavLink>
            <NavLink className='btn btn-outline-success text-dark m-3' activeClassName='btn-success text-white' exact to='/employees/create'>Create New Employee</NavLink>
        </div>
    )
}

export default Navbar
