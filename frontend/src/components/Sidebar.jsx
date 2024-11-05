import React, { useEffect, useState } from 'react'
import { TbNotes } from "react-icons/tb";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import axios from 'axios';
import { API_URL } from '../api';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const handleSubmit = ()=> {
        dispatch(authActions.logout());
        localStorage.clear("token");
        navigate('/login');
    }
    const data = [
        {
            title: "All task",
            icon: <TbNotes />,
            link: '/'
        },
        {
            title: "Important task",
            icon: <MdLabelImportantOutline />,
            link: '/importantTasks'
            
        },
        {
            title: "Completed task",
            icon: <FaCheckDouble />,
            link: '/completedTasks'
        },
        {
            title: "Pending task",
            icon: <MdPendingActions />,
            link: '/pendingTasks'
        },
    ]
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${API_URL}/todos/get-all-todos`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTodo(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        if(localStorage.getItem('token')){
            fetchTodos();
        }
    }, []);
    return (
        <>
            {todo && <div>
                <h2 className='text-xl font-semibold'>{todo.data.name}</h2>
                <h4 className='mb-1 text-blue-800'>{todo.data.email}</h4>
                <hr />
            </div>}
            <div>
                {data.map((items, i)=> (
                    <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'>
                        {items.icon}&nbsp;
                        {items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button className='bg-gray-600 rounded w-full p-2' onClick={handleSubmit}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar