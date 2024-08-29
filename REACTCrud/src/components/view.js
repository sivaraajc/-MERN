import React from 'react';
import { useLocation } from 'react-router-dom';

function View() {
    const location = useLocation();
    const data = location.state?.data || {}; // Retrieve passed data

    return (
        <div className='viewpage'>
            <h1>View Details</h1>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Password:</strong> {data.password}</p>
            <p><strong>Phone:</strong> {data.phoneno}</p>
            <p><strong>Address:</strong> {data.address}</p>
        </div>
    );
}

export default View;
