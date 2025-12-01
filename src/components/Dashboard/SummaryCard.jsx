import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function SummaryCard({ title, amount, type }) {
    const getIcon = () => {
        switch (type) {
            case 'income':
                return <TrendingUp className="h-8 w-8 text-green-500" />
            case 'expense':
                return <TrendingDown className="h-8 w-8 text-red-500" />
            default:
                return <Wallet className="h-8 w-8 text-ghoul-red" />
        }
    }

    const getColor = () => {
        switch (type) {
            case 'income':
                return 'text-green-500'
            case 'expense':
                return 'text-red-500'
            default:
                return 'text-ghoul-white'
        }
    }

    return (
        <div className="bg-ghoul-dark overflow-hidden shadow-lg shadow-black/50 rounded-lg border border-ghoul-gray">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-ghoul-muted truncate">
                                {title}
                            </dt>
                            <dd className={`text-2xl font-bold ${getColor()}`}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(amount)}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
