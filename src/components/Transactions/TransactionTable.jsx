import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function TransactionTable({ transactions, loading, onEdit, onDelete }) {
    return (
        <div className="hidden md:block overflow-hidden border border-ghoul-gray rounded-lg">
            <table className="min-w-full divide-y divide-ghoul-gray">
                <thead className="bg-ghoul-dark">
                    <tr>
                        <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold text-ghoul-white uppercase tracking-wide">
                            Data
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-ghoul-white uppercase tracking-wide">
                            Descrição
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-ghoul-white uppercase tracking-wide">
                            Categoria
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-ghoul-white uppercase tracking-wide">
                            Valor
                        </th>
                        <th scope="col" className="relative py-4 pl-3 pr-6">
                            <span className="sr-only">Ações</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ghoul-gray bg-ghoul-black">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center py-12 text-ghoul-muted">
                                Carregando...
                            </td>
                        </tr>
                    ) : transactions.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-12 text-ghoul-muted">
                                Nenhuma transação encontrada neste mês.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-ghoul-dark transition-colors">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-ghoul-white">
                                    {formatDate(transaction.date)}
                                </td>
                                <td className="px-3 py-4 text-sm text-ghoul-white">
                                    {transaction.description}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${transaction.type === 'income'
                                        ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                                        : 'bg-red-900/30 text-red-400 border border-red-700/50'
                                        }`}>
                                        {transaction.categories?.name || 'Sem categoria'}
                                    </span>
                                </td>
                                <td className={`whitespace-nowrap px-3 py-4 text-sm font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm">
                                    <button
                                        onClick={() => onEdit(transaction)}
                                        className="text-ghoul-muted hover:text-ghoul-white mr-3 transition-colors"
                                        title="Editar"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(transaction.id)}
                                        className="text-ghoul-muted hover:text-ghoul-red transition-colors"
                                        title="Excluir"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
