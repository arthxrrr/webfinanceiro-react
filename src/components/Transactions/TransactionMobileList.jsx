import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function TransactionMobileList({ transactions, loading, onEdit, onDelete }) {
    if (loading) {
        return <div className="md:hidden text-center py-8 text-ghoul-muted">Carregando...</div>
    }

    if (transactions.length === 0) {
        return <div className="md:hidden text-center py-8 text-ghoul-muted">Nenhuma transação encontrada.</div>
    }

    return (
        <div className="md:hidden space-y-4">
            {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-ghoul-dark border border-ghoul-gray rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="text-xs text-ghoul-muted block mb-1">{formatDate(transaction.date)}</span>
                            <h3 className="text-ghoul-white font-medium text-lg">{transaction.description}</h3>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${transaction.type === 'income'
                            ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                            : 'bg-red-900/30 text-red-400 border border-red-700/50'
                            }`}>
                            {transaction.categories?.name || 'Sem categoria'}
                        </span>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                        <span className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                            }`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                        </span>

                        <div className="flex gap-3">
                            <button
                                onClick={() => onEdit(transaction)}
                                className="p-2 text-ghoul-muted hover:text-ghoul-white bg-ghoul-black rounded-md border border-ghoul-gray"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(transaction.id)}
                                className="p-2 text-ghoul-muted hover:text-ghoul-red bg-ghoul-black rounded-md border border-ghoul-gray"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
