/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

const authReducer = (state, action) => { 
    switch (action.type) {
        case 'LOGIN':
            return { accessToken: action.payload }
        case 'LOGOUT':
            return { accessToken: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(authReducer, { accessToken: null });

    useEffect(() => {
        const validateUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    const response = await axiosInstance.post('/auth/validate-token', { token: accessToken });
                    if (response?.data?.valid) {
                        dispatch({ type: 'LOGIN', payload: accessToken})
                    } else {
                        localStorage.removeItem('accessToken');
                    }
                } catch (error) {
                    localStorage.removeItem('accessToken');
                }
            }
        }
        validateUser();
    }, [])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

}

