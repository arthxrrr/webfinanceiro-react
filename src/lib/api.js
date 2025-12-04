import { supabase } from './supabase'

export const api = {
    transactions: {
        list: async (userId, startDate, endDate) => {
            const { data, error } = await supabase
                .from('transactions')
                .select(`
                    *,
                    categories (name)
                `)
                .gte('date', startDate)
                .lte('date', endDate)
                .order('date', { ascending: false })

            if (error) throw error
            return data
        },

        delete: async (id) => {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id)

            if (error) throw error
        },

        save: async (transaction, userId) => {
            const payload = { ...transaction, user_id: userId }

            if (transaction.id) {
                const { error } = await supabase
                    .from('transactions')
                    .update(payload)
                    .eq('id', transaction.id)
                if (error) throw error
            } else {
                const insertPayload = { ...payload }
                delete insertPayload.id

                if (!insertPayload.id) {
                    insertPayload.id = crypto.randomUUID()
                }

                const { error } = await supabase
                    .from('transactions')
                    .insert([insertPayload])
                if (error) throw error
            }
        }
    },

    categories: {
        list: async (userId) => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('user_id', userId)

            if (error) throw error
            return data
        },

        create: async (category) => {
            const { data, error } = await supabase
                .from('categories')
                .insert([category])
                .select()
                .single()

            if (error) throw error
            return data
        },

        deleteMany: async (ids) => {
            const { error } = await supabase
                .from('categories')
                .delete()
                .in('id', ids)

            if (error) throw error
        }
    }
}
