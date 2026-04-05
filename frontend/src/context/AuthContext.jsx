import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            try {
                // simple JWT decoding
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ id: payload.id, role: payload.role });
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch(e) {
                console.error("Invalid token");
                logout();
            }
        } else {
            localStorage.removeItem('token');
            setUser(null);
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post('/api/users/login', { email, password });
        setToken(res.data.token);
    };

    const register = async (name, email, password, role) => {
        const res = await axios.post('/api/users/register', { name, email, password, role });
        return res.data;
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
