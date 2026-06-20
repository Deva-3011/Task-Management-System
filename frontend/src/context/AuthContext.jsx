import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

function readStoredSession() {
  const token = localStorage.getItem('task-portal-token');
  const userJson = localStorage.getItem('task-portal-user');

  return {
    token,
    user: userJson ? JSON.parse(userJson) : null
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = readStoredSession();
    setToken(session.token);
    setUser(session.user);
  }, []);

  const persistSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('task-portal-token', nextToken);
    localStorage.setItem('task-portal-user', JSON.stringify(nextUser));
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    persistSession(response.token, response.user);
    return response;
  };

  const register = async (payload) => {
    const response = await registerUser(payload);
    persistSession(response.token, response.user);
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('task-portal-token');
    localStorage.removeItem('task-portal-user');
  };

  const value = useMemo(
    () => ({ token, user, login, register, logout, isAuthenticated: Boolean(token) }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
