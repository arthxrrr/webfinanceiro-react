/**
 * Formatting Utilities
 * Pure functions for data formatting
 */

import { LOCALE, CURRENCY, DATE_FORMAT } from '../../config/constants';

/**
 * Formats a number as currency
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: CURRENCY
    }).format(value);
};

/**
 * Formats a date string from YYYY-MM-DD to DD/MM/YYYY
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string DD/MM/YYYY
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

/**
 * Formats a date for input fields (YYYY-MM-DD)
 * @param {Date|string} date - Date object or string
 * @returns {string} Date in YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(DATE_FORMAT.ISO);
};

/**
 * Formats a date to a readable string
 * @param {Date|string} date - Date object or string
 * @param {string} locale - Locale string (default: pt-BR)
 * @returns {string} Formatted date string
 */
export const formatDateLong = (date, locale = LOCALE) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Formats a number with thousand separators
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
    return new Intl.NumberFormat(LOCALE).format(value);
};
