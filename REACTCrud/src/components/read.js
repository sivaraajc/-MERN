import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Read() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching data from an API endpoint
        fetch('http://localhost:4000/reactget')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleRadioChange = (id) => {
        setSelectedId(id);
    };

    const handleView = () => {
        if (selectedId) {
            // Redirect to view page with the selected data
            const selectedData = data.find(item => item.id === selectedId);
            navigate(`/view/${selectedId}`, { state: { data: selectedData } });
        }
    };

    const handleUpdate = () => {
        if (selectedId) {
            const selectedData = data.find(item => item.id === selectedId);
            navigate(`/update/${selectedId}`, { state: { data: selectedData } });
        }
    };

    const handleDelete = async () => {
        if (selectedId) {
            const confirmDelete = window.confirm('Are you sure you want to delete this item?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://localhost:4000/reactdelete/${selectedId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        console.log('Delete successful');
                        setData(prevData => prevData.filter(item => item.id !== selectedId));
                        setSelectedId(null); // Clear selected ID
                    } else {
                        console.error('Error:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };


    return (
        <div className='read'>
            <h2>Data Table</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Radio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.phoneno}</td>
                                <td>{item.address}</td>
                                <td>
                                    <input
                                        type='radio'
                                        name='selection'
                                        checked={selectedId === item.id}
                                        onChange={() => handleRadioChange(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            {selectedId && (
                <div className='actions'>
                    <button onClick={handleView}>View</button>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Read;
