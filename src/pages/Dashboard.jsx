import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import SummaryCard from '../components/Dashboard/SummaryCard'
import { formatDate } from '../utils/formatters'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function Dashboard() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 })
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (error) throw error

            const income = data
                .filter(t => t.type === 'income')
                .reduce((acc, curr) => acc + Number(curr.amount), 0)

            const expense = data
                .filter(t => t.type === 'expense')
                .reduce((acc, curr) => acc + Number(curr.amount), 0)

            setSummary({
                income,
                expense,
                balance: income - expense
            })
            setTransactions(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const chartData = {
        labels: ['Receitas', 'Despesas'],
        datasets: [
            {
                label: 'Total',
                data: [summary.income, summary.expense],
                backgroundColor: ['rgba(34, 197, 94, 0.6)', 'rgba(220, 38, 38, 0.8)'],
                borderColor: ['rgb(34, 197, 94)', 'rgb(220, 38, 38)'],
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#a1a1aa'
                }
            }
        },
        scales: {
            y: {
                grid: {
                    color: '#27272a'
                },
                ticks: {
                    color: '#a1a1aa'
                }
            },
            x: {
                grid: {
                    color: '#27272a'
                },
                ticks: {
                    color: '#a1a1aa'
                }
            }
        }
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-ghoul-white tracking-tight">Dashboard</h1>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <SummaryCard title="Receitas" amount={summary.income} type="income" />
                <SummaryCard title="Despesas" amount={summary.expense} type="expense" />
                <SummaryCard title="Saldo" amount={summary.balance} type="balance" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-ghoul-dark shadow-lg shadow-black/50 rounded-lg p-6 border border-ghoul-gray">
                    <h3 className="text-lg leading-6 font-medium text-ghoul-white mb-4">Visão Geral</h3>
                    <div className="h-64">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-ghoul-dark shadow-lg shadow-black/50 rounded-lg p-6 border border-ghoul-gray">
                    <h3 className="text-lg leading-6 font-medium text-ghoul-white mb-4">Últimas Transações</h3>
                    <div className="flow-root">
                        <ul className="-my-5 divide-y divide-ghoul-gray">
                            {transactions.slice(0, 5).map((transaction) => (
                                <li key={transaction.id} className="py-4 hover:bg-ghoul-gray/20 transition-colors rounded px-2 -mx-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-ghoul-white truncate">
                                                {transaction.description}
                                            </p>
                                            <p className="text-sm text-ghoul-muted truncate">
                                                {formatDate(transaction.date)}
                                            </p>
                                        </div>
                                        <div className={`inline-flex items-center text-base font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {transactions.length === 0 && (
                                <li className="py-4 text-center text-ghoul-muted">Nenhuma transação encontrada</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
