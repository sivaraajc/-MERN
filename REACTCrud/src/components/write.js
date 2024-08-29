import React,{useState} from 'react';
import './write.css';


function Write() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneno: ''
    });

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
            const response = await fetch('http://localhost:4000/reactcreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                // Optionally clear the form or show a success message
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    phoneno: ''
                });
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
        <form onSubmit={handleSubmit} className='write'>
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

export default Write;