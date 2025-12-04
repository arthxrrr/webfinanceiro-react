// português e moeda 
export const LOCALE = 'pt-BR';
export const CURRENCY = 'BRL';

export const DATE_FORMAT = {
    DISPLAY: 'dd/MM/yyyy',
    INPUT: 'yyyy-MM-dd',
    ISO: 'en-CA'
};

export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
};

export const DEFAULT_CATEGORY = 'Outro';

export const ERROR_MESSAGES = {
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    AUTH_FAILED: 'Falha na autenticação. Verifique suas credenciais.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    NOT_FOUND: 'Recurso não encontrado.',
    VALIDATION: 'Dados inválidos. Verifique os campos.',
    EMAIL_IN_USE: 'Este email já está em uso.',
    WEAK_PASSWORD: 'A senha deve ter pelo menos 6 caracteres.',
    EMAIL_NOT_CONFIRMED: 'Por favor, confirme seu email antes de fazer login.'
};

export const SUCCESS_MESSAGES = {
    TRANSACTION_SAVED: 'Transação salva com sucesso!',
    TRANSACTION_DELETED: 'Transação excluída com sucesso!',
    CATEGORY_CREATED: 'Categoria criada com sucesso!',
    ACCOUNT_CREATED: 'Conta criada com sucesso!',
    LOGIN_SUCCESS: 'Login realizado com sucesso!'
};

export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_DESCRIPTION_LENGTH: 255,
    MIN_AMOUNT: 0.01,
    MAX_AMOUNT: 999999999.99
};

export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

export const DEMO_CREDENTIALS = {
    EMAIL: 'arthurhenriqueg0d@gmail.com',
    PASSWORD: 'demo123',
    NAME: 'Usuário Demo'
};
