import { supabase } from '../../lib/supabase';
import { ERROR_MESSAGES, DEFAULT_CATEGORY, TRANSACTION_TYPES } from '../../config/constants';

/**
 * busca todas as categorias para um usuário
 * @param {string} userId -  ID
 * @returns {Promise<Array>} array categorias
 * @throws {Error} 
 */
export const fetchCategories = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('user_id', userId);

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * criar nova categoria
 * @param {Object} category - categoria data
 * @returns {Promise<Object>} criado category
 * @throws {Error} 
 */
export const createCategory = async (category) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .insert([category])
            .select()
            .single();

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
        return data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

/**
 *deletar multiplas categorias
 * @param {Array<string>} ids 
 * @returns {Promise<void>}
 * @throws {Error} 
 */
export const deleteCategories = async (ids) => {
    try {
        const { error } = await supabase
            .from('categories')
            .delete()
            .in('id', ids);

        if (error) throw new Error(error.message || ERROR_MESSAGES.GENERIC);
    } catch (error) {
        console.error('Error deleting categories:', error);
        throw error;
    }
};

/**

 * @param {string} userId - 
 * @returns {Promise<Array>} 
 * @throws {Error} 
 */
export const ensureDefaultCategories = async (userId) => {
    try {
        const existingCategories = await fetchCategories(userId);
        let finalCategories = [...existingCategories];
        const types = [TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.EXPENSE];

        for (const type of types) {
            const defaultCats = finalCategories.filter(
                cat => cat.name === DEFAULT_CATEGORY && cat.type === type
            );

            if (defaultCats.length > 1) {

                const [keep, ...remove] = defaultCats.sort((a, b) => a.id - b.id);
                const removeIds = remove.map(c => c.id);

                await deleteCategories(removeIds);
                finalCategories = finalCategories.filter(c => !removeIds.includes(c.id));
            } else if (defaultCats.length === 0) {

                const newCat = await createCategory({
                    user_id: userId,
                    name: DEFAULT_CATEGORY,
                    type: type
                });

                if (newCat) {
                    finalCategories.push(newCat);
                }
            }
        }

        return finalCategories;
    } catch (error) {
        console.error('Error ensuring default categories:', error);
        throw error;
    }
};
