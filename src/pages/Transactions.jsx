import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import TransactionForm from '../components/Transactions/TransactionForm'
import { Plus, Filter } from 'lucide-react'
import { useTransactions } from '../utils/hooks'
import TransactionTable from '../components/Transactions/TransactionTable'
import TransactionMobileList from '../components/Transactions/TransactionMobileList'

export default function Transactions() {
    const { user } = useAuth()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState(null)
    const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 7))

    const { transactions, loading, fetchTransactions, deleteTransaction } = useTransactions(user, filterDate)

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta transação?')) return

        const success = await deleteTransaction(id)
        if (!success) alert('Erro ao excluir')
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
                <TransactionTable
                    transactions={transactions}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <TransactionMobileList
                    transactions={transactions}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
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
