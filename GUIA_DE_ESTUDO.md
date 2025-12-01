# Guia de Estudo - Aplicação Financeira Pessoal (Arthur Henrique)

Este documento explica as tecnologias utilizadas, a arquitetura do projeto e como as funcionalidades foram implementadas. Ideal para estudo e apresentação em portfólio.

## 🛠 Tecnologias Utilizadas

### 1. React (Vite)
-   **O que é:** Biblioteca JavaScript para construção de interfaces.
-   **Por que:** Permite criar uma SPA (Single Page Application) rápida e reativa. Usamos Vite como bundler por ser extremamente rápido no desenvolvimento.
-   **Uso:** Componentes funcionais, Hooks (`useState`, `useEffect`, `useContext`) e React Router para navegação.

### 2. Supabase
-   **O que é:** Uma alternativa open-source ao Firebase. Oferece Banco de Dados (PostgreSQL), Autenticação e APIs em tempo real.
-   **Por que:** Facilita o backend, entregando banco de dados e auth prontos sem precisar configurar um servidor Node.js do zero.
-   **Uso:**
    -   **Auth:** Gerenciamento de usuários (Login/Cadastro com confirmação de email).
    -   **Database:** Tabelas `transactions`, `categories` e `profiles`.
    -   **RLS (Row Level Security):** Regras de segurança que garantem que um usuário só veja seus próprios dados.

### 3. Tailwind CSS (Tema Tokyo Ghoul)
-   **O que é:** Framework CSS "utility-first".
-   **Por que:** Acelera a estilização permitindo escrever classes direto no HTML.
-   **Personalização:** Criamos um tema personalizado "Tokyo Ghoul" no `tailwind.config.js` com cores específicas:
    -   `ghoul-black`: Fundo principal (#050505)
    -   `ghoul-dark`: Cards e elementos secundários (#0a0a0a)
    -   `ghoul-red`: Acentos e destaques (#dc2626)
    -   `ghoul-blood`: Variação mais escura do vermelho (#991b1b)
    -   `ghoul-white`: Texto principal (#f4f4f5)

### 4. Chart.js (`react-chartjs-2`)
-   **O que é:** Biblioteca de gráficos.
-   **Por que:** Simples de implementar e visualmente agradável para dashboards.
-   **Uso:** Gráfico de barras no Dashboard comparando Receitas vs Despesas, estilizado com as cores do tema.

---

## 🏗 Arquitetura do Projeto

### Estrutura de Pastas (Simplificada)
```
src/
├── components/        # Componentes reutilizáveis
│   ├── Dashboard/     # Componentes específicos do Dashboard (SummaryCard)
│   ├── Transactions/  # Componentes específicos de Transações (Formulário)
│   ├── Layout.jsx     # Sidebar e estrutura base
│   └── ProtectedRoute # Protege rotas privadas
├── contexts/
│   └── AuthContext    # Estado global do usuário (Logado/Deslogado)
├── lib/
│   └── supabase.js    # Configuração do cliente Supabase
├── pages/             # Páginas da aplicação
│   ├── Dashboard      # Visão geral e gráficos
│   ├── Transactions   # Tabela e CRUD
│   └── Login/Register # Autenticação
├── utils/
│   └── helpers.js     # Funções puras (formatação, cálculos)
```

### Fluxo de Dados
1.  **Autenticação:** O `AuthContext` verifica se existe uma sessão ativa no Supabase. Se não, redireciona para Login.
2.  **Dashboard:** Ao carregar, busca todas as transações do usuário, calcula os totais (Receita/Despesa) usando funções auxiliares (`utils/helpers.js`) e alimenta os Cards e o Gráfico.
3.  **Transações:**
    -   **Leitura:** Busca dados filtrados por mês/ano.
    -   **Escrita:** O formulário envia um `INSERT` ou `UPDATE` para o Supabase.
    -   **Segurança:** O Supabase garante via RLS que `auth.uid() = user_id`.

---

## 💡 Destaques do Código

### Context API (AuthContext.jsx)
Usamos a Context API para evitar "prop drilling". O `AuthContext` gerencia o estado de autenticação (`user`, `loading`) e fornece funções de `signIn`, `signUp` e `signOut` para toda a aplicação.

### Funções Utilitárias (utils/helpers.js)
Separamos a lógica de formatação e cálculos em funções puras para manter os componentes limpos e facilitar testes:
- `formatCurrency(value)`: Formata para Real (R$).
- `formatDate(date)`: Formata data para padrão BR.
- `calculateIncome/Expenses/Balance`: Realiza os cálculos financeiros.

### Row Level Security (RLS)
No banco de dados, configuramos políticas de segurança robustas. Além disso, implementamos `ON DELETE CASCADE` para garantir que, se um usuário for deletado, todos os seus dados (transações, categorias, perfil) sejam removidos automaticamente.

### Design System (Tokyo Ghoul)
A aplicação segue uma identidade visual forte e consistente, definida no `tailwind.config.js` e aplicada globalmente via classes utilitárias, garantindo um visual profissional e moderno.

---

## 🚀 Próximos Passos (Sugestões de Melhoria)
-   [ ] Adicionar paginação na tabela de transações.
-   [ ] Permitir criar categorias personalizadas.
-   [ ] Exportar dados para CSV/PDF.
-   [ ] Adicionar filtros avançados de busca.
