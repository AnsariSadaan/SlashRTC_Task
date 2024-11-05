import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { API_URL } from '../api';
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, refreshData, setUpdatedData }) => {
    const handleCompleted = async (id)=> {
        try {
            const response = await axios.put(`${API_URL}/todos/update-completed-todo/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            alert(response.data.message);
            refreshData();
        } catch (error) {
            console.log("Error updating completion status:", error.response.data.message);
        }
    }

    const handleDelete = async (id)=> {
        try {
            const response = await axios.delete(`${API_URL}/todos/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            alert(response.data.message);
            refreshData();
        } catch (error) {
            console.log("Error While deleteing Todo", error)
        }   
    }


    const handleImportant = async (id) => {
        try {
            const response = await axios.put(`${API_URL}/todos/update-imp-todo/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            refreshData();
        } catch (error) {
            console.log("Error updating completion status:", error.response.data.message);
        }
    }

    const handleUpdate = async (id, title, description)=> {
        setInputDiv("fixed");
        setUpdatedData({id:id, title:title, description:description})
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {data && data.map((items, i) => (
                <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
                    <div >
                        <h3 className='text-xl font-bold'>{items.title}</h3>
                        <p className='text-gray-300'>{items.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${items.completed === false ? "bg-red-400" : "bg-green-600"} rounded p-2 w-3/6`}
                        onClick={()=>handleCompleted(items._id)}>{items.completed ? "Completed" : "Incomplete"}</button>
                        <div className='text-white p-2 w-3/6 text-2xl flex justify-around'>
                            <button onClick={() => handleImportant(items._id)}>
                                {items.important === false ? <FaRegHeart /> : <FaHeart className='text-red-500' /> }
                            </button>
                            {home !== "false" && <button onClick={()=>handleUpdate(items._id, items.title, items.description)}><FaRegEdit /></button>}
                            <button onClick={()=>handleDelete(items._id)}><MdDeleteOutline /></button>
                        </div>
                    </div>
                </div>
            ))}

            {home === "true" && (
                <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={()=>setInputDiv("fixed")}>
                    <FiPlusCircle className='text-4xl' />
                    <h2 className='text-2xl'>Add Task</h2>
                </button>)}
        </div>
    )
}

export default Cards