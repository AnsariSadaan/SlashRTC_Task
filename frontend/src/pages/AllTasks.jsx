import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import { FiPlusCircle } from 'react-icons/fi'
import InputData from '../components/InputData'
import axios from 'axios'
import { API_URL } from '../api'

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [data, setData] = useState([]);
    const [updatedData, setUpdatedData] = useState({ id: "", title: "", description: "" })
    const refreshData = async () => {
        try {
            const response = await axios.get(`${API_URL}/todos/get-all-todos`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response.data.data.todo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")){
            refreshData();
        }
    }, []);

    return (
        <>
            <div>
                <div className='w-full flex justify-end p-3'>
                    <button onClick={() => setInputDiv("fixed")}>
                        <FiPlusCircle className='text-3xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
                    </button>
                </div>
                {data && <Cards home={"true"} setInputDiv={setInputDiv} data={data} refreshData={refreshData} setUpdatedData={setUpdatedData} />}
            </div>
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} refreshData={refreshData} updatedData={updatedData} setUpdatedData={setUpdatedData} />
        </>
    );
}

export default AllTasks;

