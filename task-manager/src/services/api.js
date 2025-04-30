import axios from 'axios';

const API_URL = 'http://localhost:5127/api/tasks';

export const getAllTasks = async() => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch(error){
        console.error("Error fetching all tasks: ", error);
        // throw error;
    }
};

export const getCompletedTasks = async() => {
    try{
        const response = await axios.get(`${API_URL}/completed`);
        return response.data;
    }
    catch(error){
        console.error("Error fetching completed tasks: ", error);
        // throw error;
    }
};

export const getUpcomingTasks = async() => {
    try{
        const response = await axios.get(`${API_URL}/upcoming`);
        return response.data;
    }
    catch(error){
        console.error("Error fetching upcoming tasks: ", error);
        // throw error;
    }
};

export const getTaskById = async(id) => {
    try{
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
    catch(error){
        console.error("Error fetching task: ", error);
        // throw error;
    }
}

export const createTask = async(taskname) => {
    try{
        const task = {
            "Name": taskname
        }
        const response = await axios.post(`${API_URL}/create`, task);
        return response.data;
    }
    catch(error){
        console.error("Error creating task: ", error);
        // throw error;
    }
}

export const completeTask = async(id) => {
    try{
        const response = await axios.get(`${API_URL}/complete/${id}`);
        return response;
    }
    catch(error){
        console.error("Error completing task: ", error);
        // throw error;
    }
}

export const deleteTask = async(id) => {
    try{
        const response = await axios.get(`${API_URL}/delete/${id}`);
        return response;
    }
    catch(error){
        console.error("Error deleting task: ", error);
        // throw error;
    }
}