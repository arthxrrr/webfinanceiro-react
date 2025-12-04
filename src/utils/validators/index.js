/**
 * Validation Utilities
 * Pure functions for data validation
 */

import { VALIDATION } from '../../config/constants';

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPassword = (password) => {
    if (!password) return false;
    return password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
};

/**
 * Validates a transaction amount
 * @param {number} amount - Amount to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidAmount = (amount) => {
    const num = Number(amount);
    return !isNaN(num) && num >= VALIDATION.MIN_AMOUNT && num <= VALIDATION.MAX_AMOUNT;
};

/**
 * Validates a date string
 * @param {string} dateString - Date string to validate (YYYY-MM-DD)
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

/**
 * Validates required fields in an object
 * @param {Object} obj - Object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {boolean} True if all required fields are present and not empty
 */
export const hasRequiredFields = (obj, requiredFields) => {
    return requiredFields.every(field => {
        const value = obj[field];
        return value !== undefined && value !== null && value !== '';
    });
};

/**
 * Validates a description length
 * @param {string} description - Description to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidDescription = (description) => {
    if (!description) return true; // Optional field
    return description.length <= VALIDATION.MAX_DESCRIPTION_LENGTH;
};
