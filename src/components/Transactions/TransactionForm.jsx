import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { X } from 'lucide-react'

export default function TransactionForm({ onClose, onSuccess, transactionToEdit }) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category_id: '',
        date: new Date().toISOString().split('T')[0]
    })

    useEffect(() => {
        fetchCategories()
        if (transactionToEdit) {
            setFormData({
                description: transactionToEdit.description,
                amount: transactionToEdit.amount,
                type: transactionToEdit.type,
                category_id: transactionToEdit.category_id,
                date: transactionToEdit.date
            })
        }
    }, [transactionToEdit])

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('*')
            .eq('user_id', user.id)
        if (data) setCategories(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...formData,
                user_id: user.id
            }

            let error
            if (transactionToEdit) {
                const result = await supabase
                    .from('transactions')
                    .update(payload)
                    .eq('id', transactionToEdit.id)
                error = result.error
            } else {
                const result = await supabase
                    .from('transactions')
                    .insert([payload])
                error = result.error
            }

            if (error) throw error
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error saving transaction:', error)
            alert('Erro ao salvar transação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <div className="relative bg-ghoul-dark rounded-lg max-w-md w-full p-6 border border-ghoul-gray shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-ghoul-white">
                            {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
                        </h3>
                        <button onClick={onClose} className="text-ghoul-muted hover:text-ghoul-white">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-ghoul-muted">Descrição</label>
                            <input
                                type="text"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-ghoul-gray bg-ghoul-black text-ghoul-white shadow-sm focus:border-ghoul-red focus:ring-ghoul-red"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ghoul-muted">Valor</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="mt-1 block w-full rounded-md border-ghoul-gray bg-ghoul-black text-ghoul-white shadow-sm focus:border-ghoul-red focus:ring-ghoul-red"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ghoul-muted">Tipo</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="mt-1 block w-full rounded-md border-ghoul-gray bg-ghoul-black text-ghoul-white shadow-sm focus:border-ghoul-red focus:ring-ghoul-red"
                            >
                                <option value="income">Receita</option>
                                <option value="expense">Despesa</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ghoul-muted">Categoria</label>
                            <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="mt-1 block w-full rounded-md border-ghoul-gray bg-ghoul-black text-ghoul-white shadow-sm focus:border-ghoul-red focus:ring-ghoul-red"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories
                                    .filter(cat => cat.type === formData.type)
                                    .map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ghoul-muted">Data</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="mt-1 block w-full rounded-md border-ghoul-gray bg-ghoul-black text-ghoul-white shadow-sm focus:border-ghoul-red focus:ring-ghoul-red"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-ghoul-gray text-ghoul-white px-4 py-2 rounded-md hover:bg-ghoul-gray/80"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-ghoul-red text-white px-4 py-2 rounded-md hover:bg-ghoul-blood disabled:opacity-50"
                            >
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
