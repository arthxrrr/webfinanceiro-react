/* funções utilitárias para formatação */

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export const formatDate = (dateString) => {
    if (!dateString) return ''

    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export const formatDateForInput = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-CA') // YYYY-MM-DD
}

/* funções utilitárias para cálculos de transações */

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
