/**
 * autenticação
 */

import { supabase } from '../../lib/supabase';
import { ERROR_MESSAGES, DEMO_CREDENTIALS } from '../../config/constants';

/**
 * sign up
 * @param {string} email 
 * @param {string} password 
 * @param {string} fullName 
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
export const signUp = async (email, password, fullName) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            // erros
            if (error.message.includes('already registered')) {
                throw new Error(ERROR_MESSAGES.EMAIL_IN_USE);
            } else if (error.message.includes('Password should be at least')) {
                throw new Error(ERROR_MESSAGES.WEAK_PASSWORD);
            }
            throw new Error(error.message || ERROR_MESSAGES.AUTH_FAILED);
        }

        return data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

/**
 * sign in
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
export const signIn = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message || ERROR_MESSAGES.AUTH_FAILED);
        return data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

/**
 * sign in demo
 * @returns {Promise<Object>} 
 * @throws {Error} 
 */
export const signInAsDemo = async () => {
    try {
        return await signIn(DEMO_CREDENTIALS.EMAIL, DEMO_CREDENTIALS.PASSWORD);
    } catch (error) {
        console.error('Error signing in as demo:', error);
        throw new Error('Falha ao fazer login demo. Tente novamente.');
    }
};

/**
 * desconecta
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

/**
 * consgue logar
 * @returns {Promise<Object|null>} 
 */
export const getSession = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};

/**
 *  
 * @param {Function} callback - 
 * @returns {Object} 
 */
export const onAuthStateChange = (callback) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return subscription;
};
