import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from '../utils/axiosInstance';
import { useAuthContext } from './useAuthContext';

export const useAuth = () => {
    const { dispatch } = useAuthContext()

    const [ isLoading, setIsLoading ] = useState(false);

    const signup = async ({ fullName, email, password }) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/auth/signup', { fullName, email, password });
            const accessToken = response?.data?.token
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken)
                dispatch({type: 'LOGIN', payload: accessToken});
                setIsLoading(false);
                toast.success(response?.message || 'Signup Successful');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Signup failed. Please try again.')
            }

        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Signup failed. Please try again.')
        }

    }

    const login = async ({ email, password }) => { 
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const accessToken = response?.data?.token
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken) 
                dispatch({type: 'LOGIN', payload: accessToken});
                setIsLoading(false);
                toast.success(response?.message || 'Login Successful');
            } else {
                setIsLoading(false);
                toast.error(response?.message || 'Login failed. Please try again.')
            }

        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.message || 'Login failed. Please try again.')
        }
    }

    const logout = () => {
            localStorage.removeItem('accessToken')
    
            dispatch({ type: 'LOGOUT' })
        
    }

    return { signup, login, logout, isLoading}
}