import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

export const useTransactions = (user, filterDate) => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTransactions = useCallback(async () => {
        if (!user || !filterDate) return

        try {
            setLoading(true)
            const [year, month] = filterDate.split('-')
            const startDate = `${year}-${month}-01`
            const endDate = new Date(year, month, 0).toISOString().split('T')[0]

            const data = await api.transactions.list(user.id, startDate, endDate)
            setTransactions(data)
        } catch (error) {
            console.error('erro ao buscar transações:', error)
        } finally {
            setLoading(false)
        }
    }, [user, filterDate])

    const deleteTransaction = async (id) => {
        try {
            await api.transactions.delete(id)
            await fetchTransactions()
            return true
        } catch (error) {
            console.error('erro ao deletar transação:', error)
            return false
        }
    }

    const saveTransaction = async (transaction) => {
        try {
            await api.transactions.save(transaction, user.id)
            await fetchTransactions()
            return true
        } catch (error) {
            console.error('erro ao salvar transação:', error)
            return false
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return {
        transactions,
        loading,
        fetchTransactions,
        deleteTransaction,
        saveTransaction
    }
}

export const useCategories = (user) => {
    const [categories, setCategories] = useState([])

    const fetchCategories = useCallback(async () => {
        if (!user) return

        try {
            const existingCategories = await api.categories.list(user.id)

            const types = ['income', 'expense']
            let finalCategories = existingCategories ? [...existingCategories] : []
            let hasChanges = false

            for (const type of types) {
                const outros = finalCategories.filter(cat => cat.name === 'Outro' && cat.type === type)

                if (outros.length > 1) {
                    const [keep, ...remove] = outros.sort((a, b) => a.id - b.id)
                    const removeIds = remove.map(c => c.id)

                    await api.categories.deleteMany(removeIds)

                    finalCategories = finalCategories.filter(c => !removeIds.includes(c.id))
                    hasChanges = true
                } else if (outros.length === 0) {
                    const newCat = await api.categories.create({
                        user_id: user.id,
                        name: 'Outro',
                        type: type
                    })

                    if (newCat) {
                        finalCategories.push(newCat)
                        hasChanges = true
                    }
                }
            }

            setCategories(finalCategories)
        } catch (error) {
            console.error('erro ao buscar categorias:', error)
        }
    }, [user])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return { categories, fetchCategories }
}
