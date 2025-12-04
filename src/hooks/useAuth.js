import { useState, useEffect } from 'react';
import * as authService from '../services/api/auth.service';

/**
  @returns {Object} 
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        authService.getSession().then(session => {
            setUser(session?.user ?? null);
            setLoading(false);
        });


        const subscription = authService.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    /**
     * registrar novo usuario
     * @param {string} email 
     * @param {string} password 
     * @param {string} fullName 
     * @returns {Promise<Object>}
     */
    const signUp = async (email, password, fullName) => {
        try {
            setError(null);
            const data = await authService.signUp(email, password, fullName);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    /**
     * sign in
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<Object>}
     */
    const signIn = async (email, password) => {
        try {
            setError(null);
            const data = await authService.signIn(email, password);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    /**
     * sign in com demo
     * @returns {Promise<Object>}
     */
    const signInAsDemo = async () => {
        try {
            setError(null);
            const data = await authService.signInAsDemo();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    /**
     * desconecta o usuario
     * @returns {Promise<void>}
     */
    const signOut = async () => {
        try {
            setError(null);
            await authService.signOut();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        user,
        loading,
        error,
        signUp,
        signIn,
        signInAsDemo,
        signOut
    };
};
