// src/api.js
import axios from 'axios';

export const API_URL = 'http://localhost:4000/api';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Set up an interceptor to add the Authorization header if a token is present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api; // Export api as the default export

// Auth API requests
export const registerUser = (userData) => api.post('/user/register', userData);
export const loginUser = (userData) => api.post('/user/login', userData);

// Todo API requests
export const createTodo = (todoData) => api.post('/create-todo', todoData);
export const getTodos = () => api.get('/todos/get-all-todos');
export const updateTodo = (id, todoData) => api.put(`/todos/update-todo/${id}`, todoData);
export const deleteTodo = (id) => api.delete(`/todos/delete/${id}`);
export const updateCompletedTodo = (id, todoData) => api.put(`/todos/update-completed-todo/${id}`, todoData);
export const updateImpTodo = (id) => api.get(`/todos/update-imp-todo/${id}`);
export const getImportantTodo = () => api.get(`/todos/get-imp-todo`);
export const getCompletedTodo = () => api.get(`/todos/get-completed-todo`);
export const getIncompletedTodo = () => api.get(`/todos/get-incompleted-todo`);