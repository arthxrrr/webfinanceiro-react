import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext({});

/**
 * @returns {Object} 
 */
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {!auth.loading && children}
        </AuthContext.Provider>
    );
};

export { useAuthContext as useAuth };
