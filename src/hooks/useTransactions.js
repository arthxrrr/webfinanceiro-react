import { useState, useEffect, useCallback } from 'react';
import * as transactionService from '../services/api/transactions.service';

/**
 * 
 * @param {Object} user 
 * @param {string} filterDate 
 * @returns {Object} 
 */
export const useTransactions = (user, filterDate) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchTransactions = useCallback(async () => {
        if (!user || !filterDate) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const [year, month] = filterDate.split('-');
            const startDate = `${year}-${month}-01`;
            const endDate = new Date(year, month, 0).toISOString().split('T')[0];

            const data = await transactionService.fetchTransactions(user.id, startDate, endDate);
            setTransactions(data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user, filterDate]);

    /**
     * deleta a transação
     * @param {string} id 
     * @returns {Promise<boolean>} 
     */
    const deleteTransaction = async (id) => {
        try {
            setError(null);
            await transactionService.deleteTransaction(id);
            await fetchTransactions();
            return true;
        } catch (err) {
            console.error('Error deleting transaction:', err);
            setError(err.message);
            return false;
        }
    };

    /**
     * salva a transação (ou atualiza)
     * @param {Object} transaction  
     * @returns {Promise<boolean>} 
     */
    const saveTransaction = async (transaction) => {
        try {
            setError(null);
            await transactionService.saveTransaction(transaction, user.id);
            await fetchTransactions();
            return true;
        } catch (err) {
            console.error('Error saving transaction:', err);
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        loading,
        error,
        fetchTransactions,
        deleteTransaction,
        saveTransaction
    };
};
