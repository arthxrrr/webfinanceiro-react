import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import TransactionForm from '../components/Transactions/TransactionForm'
import { Plus, Pencil, Trash2, Filter } from 'lucide-react'

export default function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState(null)
    const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 7))

    useEffect(() => {
        fetchTransactions()
    }, [filterDate])

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const [year, month] = filterDate.split('-')
            const startDate = `${year}-${month}-01`
            const endDate = new Date(year, month, 0).toISOString().split('T')[0]

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
            setTransactions(data)
        } catch (error) {
            console.error('Erro ao buscar transações:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta transação?')) return

        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchTransactions()
        } catch (error) {
            console.error('Error deleting transaction:', error)
            alert('Erro ao excluir')
        }
    }

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction)
        setIsFormOpen(true)
    }

    const handleFormClose = () => {
        setIsFormOpen(false)
        setEditingTransaction(null)
    }

    const handleFormSuccess = () => {
        fetchTransactions()
    }

    return (
        <Layout>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold text-ghoul-white">Transações</h1>
                    <p className="mt-2 text-sm text-ghoul-muted">
                        Gerencie suas receitas e despesas.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex space-x-4">
                    <div className="flex items-center space-x-2 bg-ghoul-dark px-3 py-2 rounded-md border border-ghoul-gray">
                        <Filter className="h-4 w-4 text-ghoul-muted" />
                        <input
                            type="month"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="block rounded-md border-0 bg-transparent text-ghoul-white focus:ring-0 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center justify-center rounded-md bg-ghoul-red px-4 py-2 text-sm font-medium text-white hover:bg-ghoul-blood"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Transação
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <div className="overflow-hidden border border-ghoul-gray rounded-lg">
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
                                    <tr key={transaction.id} className="hover:bg-ghoul-dark">
                                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-ghoul-white">
                                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
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
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm">
                                            <button
                                                onClick={() => handleEdit(transaction)}
                                                className="text-ghoul-muted hover:text-ghoul-white mr-3"
                                                title="Editar"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(transaction.id)}
                                                className="text-ghoul-muted hover:text-ghoul-red"
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
            </div>

            {isFormOpen && (
                <TransactionForm
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                    transactionToEdit={editingTransaction}
                />
            )}
        </Layout>
    )
}
