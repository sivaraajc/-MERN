import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Update() {
    const { id } = useParams(); // Get the ID from URL parameters
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data || {}; // Retrieve passed data

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneno: ''
    });

    useEffect(() => {
        // Initialize formData with the data passed from the Read component
        if (data) {
            setFormData({
                name: data.name || '',
                email: data.email || '',
                password: data.password || '',
                address: data.address || '',
                phoneno: data.phoneno || ''
            });
        }
    }, [data]);

    // Handle input change and update state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/reactupdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                navigate('/read'); // Redirect to Read page or wherever necessary
            } else {
                console.error('Error:', response.statusText);
                // Handle error, e.g., show an error message
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    return (
        <form onSubmit={handleSubmit} className='update'>
            <label htmlFor="name">Enter The Name</label>
            <input id="name" placeholder='Enter The Name' value={formData.name} onChange={handleChange} /><br />
            
            <label htmlFor="email">Enter The Email</label>
            <input id="email" placeholder='Enter The Email' value={formData.email} onChange={handleChange} /><br />
            
            <label htmlFor="password">Enter The Password</label>
            <input id="password" type="password" placeholder='Enter The Password' value={formData.password} onChange={handleChange} /><br />
            
            <label htmlFor="address">Enter The Address</label>
            <input id="address" placeholder='Enter The Address' value={formData.address} onChange={handleChange} /><br />
            
            <label htmlFor="phoneno">Enter The Phone Number</label>
            <input id="phoneno" placeholder='Enter The Phone Number' value={formData.phoneno} onChange={handleChange} /><br />
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default Update;
