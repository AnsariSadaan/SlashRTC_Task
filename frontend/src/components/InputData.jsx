import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { API_URL } from '../api';

const InputData = ({ inputDiv, setInputDiv, refreshData, updatedData, setUpdatedData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title === "" || description === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post(`${API_URL}/todos/create-todo`, { title, description }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response);
                setTitle('');
                setDescription('');
                setInputDiv('hidden');
                refreshData();
            }
        } catch (error) {
            console.log("Error Adding todo:", error);
        }
    }

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            if (title === "" || description === "") {
                alert("All fields are required");
            } else {
                const response = await axios.put(`${API_URL}/todos/update-todo/${updatedData.id}`, { title, description }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUpdatedData({ id: "", title: "", description: "" })
                setInputDiv('hidden');
                setTitle('');
                setDescription('');
                refreshData();
            }
        } catch (error) {
            console.log("Error Adding todo:", error);
        }
    }

    useEffect(() => {
        if (updatedData) {
            setTitle(updatedData.title || ''); // Set default values in case they are undefined
            setDescription(updatedData.description || '');
        }
    }, [updatedData]);
    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-500 opacity-80 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-2/6 bg-gray-900 p-4 rounded'>
                    <div className='flex justify-end'>
                        <button className='text-2xl mb-2'
                            onClick={() => {
                                setInputDiv("hidden");
                                setTitle('');
                                setDescription('');
                                setUpdatedData({ id: "", title: "", description: "" });
                            }}>
                            <IoCloseSharp />
                        </button>
                    </div>
                    <input type="text" placeholder='Title...' name='title' value={title} className='px-3 py-2 rounded w-full bg-gray-700' onChange={(e) => setTitle(e.target.value)} />
                    <textarea name="description" id="description" cols="5" rows="10" value={description} placeholder='Enter Description...' className='px-3 py-2 rounded w-full bg-gray-700 my-3' onChange={(e) => setDescription(e.target.value)}></textarea>
                    {updatedData.id === "" ? (
                        <button className='px-3 py-2 bg-blue-600 rounded text-black text-2xl font-semibold' onClick={handleSubmit}>Submit</button>
                    ) : (
                        <button className='px-3 py-2 bg-blue-600 rounded text-black text-2xl font-semibold' onClick={updateTodo}>Update</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default InputData