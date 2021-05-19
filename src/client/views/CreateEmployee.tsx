import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IEmployee, Pizza_Response } from '../../types'

const CreateEmployee = () => {

    const history = useHistory();

    const [address, setAddress] = useState<IEmployee['address']>({
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    });
    const [company, setCompany] = useState<IEmployee['company']>({
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    });
    const [phone, setPhone] = useState<IEmployee['phone']>("1-770-736-8031 x56442");
    const [website, setWebsite] = useState<IEmployee['website']>("hildegard.org");

    const [name, setName] = useState<IEmployee['name']>('');
    const [username, setUsername] = useState<IEmployee['username']>('');
    const [email, setEmail] = useState<IEmployee['email']>('');


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!name && !username && !email) {
            console.log('Fill out all three fields, dummy');
            return;
        }

        const newEmployee = {
            name,
            username,
            email,
            address: address,
            phone,
            website,
            company: company
        }

        fetch('http://localhost:3000/api/employees', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
            .then(res => res.json())
            .then((results: Pizza_Response) => {
                history.push(`/employees/${results.created_id}`);
            })
            .catch(e => {
                console.log(e);
                alert('Check console logs, dummy');
            });
    }


    return (
        <div className='m-3 p-5 form-group shadow-lg'>
            <input placeholder='name lol' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} className="my-2 form-control"></input>
            <input placeholder='username lol' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="my-2 form-control"></input>
            <input placeholder='email lol' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="my-2 form-control"></input>
            <button onClick={handleSubmit} className='btn btn-success'>Submit!</button>
        </div>
    )
}

export default CreateEmployee
