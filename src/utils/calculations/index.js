/**
 * Calculation Utilities
 * Pure functions for financial calculations
 */

/**
 * Calculates total income from transactions
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {number} Total income
 */
export const calculateIncome = (transactions) => {
    if (!Array.isArray(transactions)) return 0;

    return transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
};

/**
 * Calculates total expenses from transactions
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {number} Total expenses
 */
export const calculateExpenses = (transactions) => {
    if (!Array.isArray(transactions)) return 0;

    return transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
};

/**
 * Calculates balance (income - expenses)
 * @param {number} income - Total income
 * @param {number} expenses - Total expenses
 * @returns {number} Balance
 */
export const calculateBalance = (income, expenses) => {
    return income - expenses;
};

/**
 * Calculates total for a specific category
 * @param {Array<Object>} transactions - Array of transaction objects
 * @param {string} categoryId - Category ID
 * @returns {number} Total for category
 */
export const calculateCategoryTotal = (transactions, categoryId) => {
    if (!Array.isArray(transactions)) return 0;

    return transactions
        .filter(t => t.category_id === categoryId)
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
};

/**
 * Groups transactions by category
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {Object} Object with category IDs as keys and totals as values
 */
export const groupByCategory = (transactions) => {
    if (!Array.isArray(transactions)) return {};

    return transactions.reduce((acc, transaction) => {
        const categoryId = transaction.category_id || 'uncategorized';
        acc[categoryId] = (acc[categoryId] || 0) + Number(transaction.amount);
        return acc;
    }, {});
};

/**
 * Calculates percentage of total
 * @param {number} value - Value
 * @param {number} total - Total
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return (value / total) * 100;
};
