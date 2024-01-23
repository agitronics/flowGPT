import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PromptManager.css';

function PromptManager() {
    // State for managing prompts
    const [prompts, setPrompts] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState({ text: '' });

    // Fetch prompts when the component mounts
    useEffect(() => {
        axios.get('/api/prompts')
            .then(response => {
                setPrompts(response.data);
            })
            .catch(error => {
                console.error('Error fetching prompts', error);
            });
    }, []);

    // Handle changes in the prompt input field
    const handleInputChange = (e) => {
        setCurrentPrompt({ ...currentPrompt, [e.target.name]: e.target.value });
    };

    // Add a new prompt
    const addPrompt = () => {
        axios.post('/api/prompts', currentPrompt)
            .then(response => {
                setPrompts([...prompts, response.data]);
                setCurrentPrompt({ text: '' });
            })
            .catch(error => {
                console.error('Error adding prompt', error);
            });
    };

    // Delete a prompt
    const deletePrompt = (id) => {
        axios.delete(`/api/prompts/${id}`)
            .then(() => {
                setPrompts(prompts.filter(prompt => prompt.id !== id));
            })
            .catch(error => {
                console.error('Error deleting prompt', error);
            });
    };

    return (
        <div className="prompt-manager">
            <div className="prompt-list">
                <h2>Prompts</h2>
                <ul>
                    {prompts.map(prompt => (
                        <li key={prompt.id}>
                            <span>{prompt.text}</span>
                            <button onClick={() => deletePrompt(prompt.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="prompt-input">
                <h2>Add Prompt</h2>
                <input
                    type="text"
                    name="text"
                    value={currentPrompt.text}
                    onChange={handleInputChange}
                />
                <button onClick={addPrompt}>Add Prompt</button>
            </div>
        </div>
    );
}

export default PromptManager;