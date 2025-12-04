import { useState, useEffect, useCallback } from 'react';
import * as categoryService from '../services/api/categories.service';

/**
 * @param {Object} user 
 * @returns {Object}
 */
export const useCategories = (user) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await categoryService.ensureDefaultCategories(user.id);
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    /**
     * cria nova categoria
     * @param {Object} category     
     * @returns {Promise<Object|null>}  
     */
    const createCategory = async (category) => {
        try {
            setError(null);
            const newCategory = await categoryService.createCategory(category);
            await fetchCategories();
            return newCategory;
        } catch (err) {
            console.error('Error creating category:', err);
            setError(err.message);
            return null;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory
    };
};
