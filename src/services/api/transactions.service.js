import { supabase } from '../../lib/supabase';
import { ERROR_MESSAGES } from '../../config/constants';

/** 
 
 @param {string} userId 
 @param {string} startDate  
 @param {string} endDate 
 @returns {Promise<Array>} 
 @throws {Error} 
 */
export const fetchTransactions = async (userId, startDate, endDate) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .select(`
        *,
        categories (name)
      `)
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false });

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
        return data || [];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

/**
 * criar nova transação
 * @param {Object} transaction - data
 * @param {string} userId - ID
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const createTransaction = async (transaction, userId) => {
    try {
        const payload = {
            ...transaction,
            user_id: userId,
            id: crypto.randomUUID()
        };

        // remove o id se existir na transação original

        delete payload.id;
        payload.id = crypto.randomUUID();

        const { error } = await supabase
            .from('transactions')
            .insert([payload]);

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

/**
 * atualiza uma transação existente
 * @param {Object} transaction dados de transação com ID
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const updateTransaction = async (transaction) => {
    try {
        const { error } = await supabase
            .from('transactions')
            .update(transaction)
            .eq('id', transaction.id);

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

/**
 * deletar a transação
 * @param {string} id - id transação
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const deleteTransaction = async (id) => {
    try {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};

/**
 * salva uma transação (cria ou atualiza com base na presença do ID)
 * @param {Object} transaction - data transação
 * @param {string} userId - ID
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const saveTransaction = async (transaction, userId) => {
    if (transaction.id) {
        return updateTransaction(transaction);
    } else {
        return createTransaction(transaction, userId);
    }
};
