import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { X } from 'lucide-react'
import { useCategories } from '../../utils/hooks'
import { api } from '../../lib/api'
import { formatDateForInput } from '../../utils/helpers'

export default function TransactionForm({ onClose, onSuccess, transactionToEdit }) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const { categories } = useCategories(user)

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category_id: '',
        date: formatDateForInput(new Date())
    })

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...formData,
                id: transactionToEdit?.id
            }

            await api.transactions.save(payload, user.id)

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
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-ghoul-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-ghoul-gray">
                    <div className="bg-ghoul-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg leading-6 font-bold text-ghoul-white">
                                {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
                            </h3>
                            <button onClick={onClose} className="text-ghoul-muted hover:text-ghoul-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-ghoul-muted mb-1">Descrição</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="block w-full rounded-md border-0 bg-ghoul-dark text-ghoul-white shadow-sm ring-1 ring-inset ring-ghoul-gray focus:ring-2 focus:ring-inset focus:ring-ghoul-red sm:text-sm sm:leading-6 py-2.5 px-3"
                                    placeholder="Ex: Compras do mês"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-ghoul-muted mb-1">Valor</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="block w-full rounded-md border-0 bg-ghoul-dark text-ghoul-white shadow-sm ring-1 ring-inset ring-ghoul-gray focus:ring-2 focus:ring-inset focus:ring-ghoul-red sm:text-sm sm:leading-6 py-2.5 px-3"
                                    placeholder="0,00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-ghoul-muted mb-1">Tipo</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value, category_id: '' })}
                                    className="block w-full rounded-md border-0 bg-ghoul-dark text-ghoul-white shadow-sm ring-1 ring-inset ring-ghoul-gray focus:ring-2 focus:ring-inset focus:ring-ghoul-red sm:text-sm sm:leading-6 py-2.5 px-3"
                                >
                                    <option value="expense">Despesa</option>
                                    <option value="income">Receita</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-ghoul-muted mb-1">Categoria</label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="block w-full rounded-md border-0 bg-ghoul-dark text-ghoul-white shadow-sm ring-1 ring-inset ring-ghoul-gray focus:ring-2 focus:ring-inset focus:ring-ghoul-red sm:text-sm sm:leading-6 py-2.5 px-3"
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
                                <label className="block text-sm font-bold text-ghoul-muted mb-1">Data</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="block w-full rounded-md border-0 bg-ghoul-dark text-ghoul-white shadow-sm ring-1 ring-inset ring-ghoul-gray focus:ring-2 focus:ring-inset focus:ring-ghoul-red sm:text-sm sm:leading-6 py-2.5 px-3"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-ghoul-dark text-ghoul-white px-4 py-3 rounded-md hover:bg-ghoul-gray border border-transparent hover:border-ghoul-gray transition-all text-sm font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-ghoul-red text-white px-4 py-3 rounded-md hover:bg-ghoul-blood transition-all text-sm font-bold shadow-lg shadow-ghoul-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
