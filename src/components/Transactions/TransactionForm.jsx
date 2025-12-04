import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { X, DollarSign, Calendar, Tag, TrendingUp, TrendingDown } from 'lucide-react'
import { useCategories } from '../../hooks'
import { formatDateForInput } from '../../utils/formatters'
import * as transactionService from '../../services/api/transactions.service'

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
            if (!formData.category_id) {
                alert('Por favor, selecione uma categoria')
                setLoading(false)
                return
            }

            const payload = {
                ...formData,
                amount: parseFloat(formData.amount),
                id: transactionToEdit?.id
            }

            await transactionService.saveTransaction(payload, user.id)

            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error saving transaction:', error)
            alert(`Erro ao salvar transação: ${error.message || 'Erro desconhecido'}`)
        } finally {
            setLoading(false)
        }
    }

    const filteredCategories = categories.filter(cat => cat.type === formData.type)

    return (
        <div className="relative z-50" aria-modal="true" role="dialog">
            { }
            <div
                className="fixed inset-0 bg-black/75 transition-opacity"
                onClick={onClose}
            />

            { }
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">

                    { }
                    <div className="
                        relative w-full max-w-md
                        bg-ghoul-dark
                        border border-ghoul-gray
                        rounded-lg shadow-xl
                        transform transition-all
                    ">
                        <div className="p-6">
                            { }
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-ghoul-white">
                                        {transactionToEdit ? 'Editar Transação' : 'Nova Transação'}
                                    </h3>
                                    <p className="text-sm text-ghoul-muted mt-1">
                                        Preencha os dados abaixo
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-md text-ghoul-muted hover:text-ghoul-white hover:bg-ghoul-gray/30 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            { }
                            <form onSubmit={handleSubmit} className="space-y-4">

                                { }
                                <div>
                                    <label className="block text-sm font-medium text-ghoul-muted mb-2">
                                        Tipo de Transação
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'expense', category_id: '' })}
                                            className={`
                                                py-2.5 px-4 rounded-md
                                                flex items-center justify-center gap-2
                                                font-medium text-sm
                                                transition-colors
                                                ${formData.type === 'expense'
                                                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                                    : 'bg-ghoul-black text-ghoul-muted border border-ghoul-gray hover:border-ghoul-gray/70'
                                                }
                                            `}
                                        >
                                            <TrendingDown className="h-4 w-4" />
                                            Despesa
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'income', category_id: '' })}
                                            className={`
                                                py-2.5 px-4 rounded-md
                                                flex items-center justify-center gap-2
                                                font-medium text-sm
                                                transition-colors
                                                ${formData.type === 'income'
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                                    : 'bg-ghoul-black text-ghoul-muted border border-ghoul-gray hover:border-ghoul-gray/70'
                                                }
                                            `}
                                        >
                                            <TrendingUp className="h-4 w-4" />
                                            Receita
                                        </button>
                                    </div>
                                </div>

                                { }
                                <div>
                                    <label className="block text-sm font-medium text-ghoul-muted mb-2">
                                        Descrição
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="
                                            block w-full rounded-md
                                            bg-ghoul-black text-ghoul-white
                                            border border-ghoul-gray
                                            focus:border-ghoul-red focus:ring-1 focus:ring-ghoul-red
                                            py-2.5 px-3
                                            placeholder:text-ghoul-muted/50
                                            transition-colors
                                        "
                                        placeholder="Ex: Compras do supermercado"
                                    />
                                </div>

                                { }
                                <div>
                                    <label className="block text-sm font-medium text-ghoul-muted mb-2">
                                        Valor
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-ghoul-muted" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="
                                                block w-full rounded-md
                                                bg-ghoul-black text-ghoul-white
                                                border border-ghoul-gray
                                                focus:border-ghoul-red focus:ring-1 focus:ring-ghoul-red
                                                py-2.5 pl-10 pr-3
                                                placeholder:text-ghoul-muted/50
                                                transition-colors
                                            "
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                { }
                                <div>
                                    <label className="block text-sm font-medium text-ghoul-muted mb-2">
                                        Categoria
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag className="h-5 w-5 text-ghoul-muted" />
                                        </div>
                                        <select
                                            required
                                            value={formData.category_id}
                                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                            className="
                                                block w-full rounded-md
                                                bg-ghoul-black text-ghoul-white
                                                border border-ghoul-gray
                                                focus:border-ghoul-red focus:ring-1 focus:ring-ghoul-red
                                                py-2.5 pl-10 pr-3
                                                transition-colors
                                                appearance-none cursor-pointer
                                            "
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            {filteredCategories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-ghoul-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                { }
                                <div>
                                    <label className="block text-sm font-medium text-ghoul-muted mb-2">
                                        Data
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-ghoul-muted" />
                                        </div>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="
                                                block w-full rounded-md
                                                bg-ghoul-black text-ghoul-white
                                                border border-ghoul-gray
                                                focus:border-ghoul-red focus:ring-1 focus:ring-ghoul-red
                                                py-2.5 pl-10 pr-3
                                                transition-colors
                                                [color-scheme:dark]
                                            "
                                            style={{
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'textfield'
                                            }}
                                        />
                                    </div>
                                </div>

                                { }
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="
                                            flex-1 py-2.5 px-4 rounded-md
                                            bg-ghoul-black text-ghoul-white
                                            border border-ghoul-gray
                                            hover:bg-ghoul-gray/30
                                            transition-colors
                                            font-medium
                                        "
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            flex-1 py-2.5 px-4 rounded-md
                                            bg-ghoul-red text-white font-bold
                                            hover:bg-ghoul-blood
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            transition-colors
                                        "
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Salvando...
                                            </span>
                                        ) : (
                                            'Salvar'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
