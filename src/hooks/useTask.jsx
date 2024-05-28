import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";


export const useTask = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ taskCreateSuccess, setTaskCreateSuccess ] = useState({});
    const [ taskUpdateSuccess, setTaskUpdateSuccess ] = useState({});
    const [ taskDeleteSuccess, setTaskDeleteSuccess ] = useState({}); 
    const [ statusUpdateSuccess, setStatusUpdateSuccess] = useState({});


    const addTask = async (task, projectId) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/task/create-task', { task, projectId });
            if (response?.data?._id) {
                setTaskCreateSuccess(response?.data)
                setIsLoading(false);
                toast.success(response?.message || 'Task added successfully');
            }
        } catch( error )  {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Task creation failed');
        }
    }

    const editTask = async ( {task, taskId} ) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch('/task/edit-task', { task,taskId });
            if (response?.data?._id) {
                setTaskUpdateSuccess(response?.data);
                setIsLoading(false);
                toast.success(response?.message || 'Task updated successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Task updation failed');
            }

        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Task updation failed');
        }
    }

    const deleteTask = async ( taskId ) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/task/delete-task/${taskId}`);
            if (response?.data) {
                setTaskDeleteSuccess(response?.data);
                setIsLoading(false);
                toast.success(response?.message || 'Task deleted successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Task deletion failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Task deletion failed');
        }
    }

    const changeStatus = async (taskId, status) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch(`/task/change-status/${taskId}`, { status });
            if (response?.data) {
                setStatusUpdateSuccess(response?.data);
                setIsLoading(false);
                toast.success(response?.message || 'Status changed successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Status change failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Status change failed');
        }
    }

        return {
            addTask,
            taskCreateSuccess,
            setTaskCreateSuccess,
            editTask,
            taskUpdateSuccess,
            deleteTask,
            taskDeleteSuccess,
            setTaskDeleteSuccess,
            changeStatus,
            statusUpdateSuccess,
            isLoading,
        }
}