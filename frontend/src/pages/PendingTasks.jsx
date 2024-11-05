import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import { API_URL } from '../api';
import axios from 'axios';

const PendingTasks = () => {
    const [data, setData] = useState([]);
    const refreshData = async () => {
        try {
            const response = await axios.get(`${API_URL}/todos/get-incompleted-todo`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        refreshData();
    }, []);
    return (
        <div><Cards home={"false"} data={data} refreshData={refreshData} /></div>
    )
}

export default PendingTasks