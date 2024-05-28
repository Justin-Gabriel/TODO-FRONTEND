import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from '../utils/axiosInstance';

export const useProject = () => {
    const [ projectCreateSuccess, setProjectCreateSuccess ] = useState({});
    const [ projectUpdateSuccess, setProjectUpdateSuccess ] = useState({});
    const [ projectDeleteSuccess, setProjectDeleteSuccess ] = useState({}); 
    const [ isLoading, setIsLoading ] = useState(false);

    const addProject = async ({ title, description }) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/project/create-project', { title, description });
            if (response?.data?._id) {
                setProjectCreateSuccess({ ...response?.data });
                setIsLoading(false);
                toast.success(response?.message || 'Project added successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project creation failed');
            }

        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project creation failed');
        }
    }

    const getProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/project/get-projects');
            if (response?.data) {
                setIsLoading(false);
                return response?.data;
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project fetching failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project fetching failed');
        }
    }

    const editProject = async ({ title, description, projectId }) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch('/project/edit-project', { title, description, projectId });
            if (response?.data?._id) {
                setProjectUpdateSuccess(response?.data);
                setIsLoading(false);
                toast.success(response?.message || 'Project updated successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project updation failed');
            }

        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project updation failed');
        }
    }

    const deleteProject = async ({ projectId }) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/project/delete-project/${projectId}`);
            if (response?.data) {
                setProjectDeleteSuccess(response?.data);
                setIsLoading(false);
                toast.success(response?.message || 'Project deleted successfully');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project deletion failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project deletion failed');
        }
    }

    const getProjectDetails = async (projectId ) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/project/${projectId}`);
            if (response?.data) {
                setIsLoading(false);
                return response?.data;
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project fetching failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project fetching failed');
        }
    }

    const projectSummary = async (projectId) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/project/summary/${projectId}`);
            if (response?.data) {
                setIsLoading(false);
                toast.success(response?.message || 'Project summary successfully fetched');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Project summary fetching failed');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Project summary fetching failed');
        }
    }

    return {
        addProject,
        getProjects,
        editProject,
        isLoading,
        projectCreateSuccess,
        projectUpdateSuccess,
        setProjectUpdateSuccess,
        setProjectCreateSuccess,
        deleteProject,
        projectDeleteSuccess,
        setProjectDeleteSuccess,
        getProjectDetails,
        projectSummary
    }
}
