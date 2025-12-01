/**
 * Funções utilitárias para formatação
 */

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
}

/**
 * Funções utilitárias para cálculos de transações
 */

export const calculateIncome = (transactions) => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
}

export const calculateExpenses = (transactions) => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
}

export const calculateBalance = (income, expenses) => {
    return income - expenses
}
