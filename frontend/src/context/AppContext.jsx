import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
const AuthContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('vf-theme') || 'light');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('vf-theme', theme);
    }, [theme]);
    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('varunUser')); } catch { return null; }
    });
    const login = (userData) => {
        localStorage.setItem('varunUser', JSON.stringify(userData));
        setUser(userData);
    };
    const logout = () => { localStorage.removeItem('varunUser'); setUser(null); };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);
