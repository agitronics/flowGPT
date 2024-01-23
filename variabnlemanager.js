import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VariableManager.css';


function VariableManager() {
    const [variables, setVariables] = useState([]);
    const [currentVariable, setCurrentVariable] = useState({ id: null, name: '', value: '' });

    useEffect(() => {
        axios.get('/api/variables')
            .then(response => setVariables(response.data))
            .catch(error => console.error('Error fetching variables', error));
    }, []);

    const handleInputChange = (e) => {
        setCurrentVariable({ ...currentVariable, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = currentVariable.id ? 'put' : 'post';
        axios[method]('/api/variables', currentVariable)
            .then(response => {
                setVariables([...variables, response.data]);
                setCurrentVariable({ id: null, name: '', value: '' });
            })
            .catch(error => console.error('Error submitting variable', error));
    };

    return (
        <div>
            <h2>Variable Manager</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={currentVariable.name}
                    onChange={handleInputChange} 
                    placeholder="Variable Name" 
                />
                <input 
                    type="text" 
                    name="value" 
                    value={currentVariable.value}
                    onChange={handleInputChange} 
                    placeholder="Value" 
                />
                <button type="submit">Save Variable</button>
            </form>
            <div>
                {variables.map(variable => (
                    <div key={variable.id}>
                        <strong>{variable.name}</strong>: {variable.value}
                        {/* Add buttons or links for editing and deleting variables */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VariableManager;
