import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Wallet } from "lucide-react";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { signUp, signInAsDemo } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await signUp(email, password, fullName);

            // verifica se precisa confirmar email
            if (data?.user?.identities?.length === 0) {
                setError("Este email já está cadastrado.");
                setLoading(false);
                return;
            }

            // mostra mensagem de sucesso
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            console.error(err);

            if (err.message.includes("already registered")) {
                setError("Este email já está em uso.");
            } else if (err.message.includes("Password should be at least")) {
                setError("A senha deve ter pelo menos 6 caracteres.");
            } else {
                setError(err.message || "Erro ao criar conta. Tente novamente.");
            }
            setLoading(false);
        }
    }

    async function handleDemoLogin() {
        setError("");
        setLoading(true);

        try {
            await signInAsDemo();
            navigate("/");
        } catch (err) {
            setError("Falha ao fazer login demo. Tente novamente.");
            console.error(err);
        }

        setLoading(false);
    }

    // tela de sucesso
    if (success) {
        return (
            <div className="min-h-screen bg-ghoul-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-ghoul-dark py-8 px-4 shadow-2xl shadow-green-500/10 sm:rounded-lg sm:px-10 border border-green-500/30">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-green-500/10 p-3">
                                <Wallet className="h-12 w-12 text-green-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-ghoul-white text-center mb-2">
                            Conta criada com sucesso!
                        </h3>
                        <p className="text-sm text-ghoul-muted text-center mb-4">
                            Enviamos um email de confirmação para:
                        </p>
                        <p className="text-sm font-medium text-ghoul-white text-center mb-4">
                            {email}
                        </p>
                        <div className="bg-ghoul-blood/20 border border-ghoul-red/30 rounded-md p-4 mb-6">
                            <p className="text-xs text-ghoul-muted text-center">
                                Por favor, verifique sua caixa de entrada (e spam) para ativar sua conta antes de fazer login.
                            </p>
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-bold text-white bg-ghoul-red hover:bg-ghoul-blood transition-all duration-200 uppercase tracking-wider"
                            >
                                Ir para Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ghoul-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Wallet className="h-12 w-12 text-ghoul-red animate-pulse" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-ghoul-white tracking-widest">
                    Criar sua conta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-ghoul-dark py-8 px-4 shadow-2xl shadow-ghoul-red/10 sm:rounded-lg sm:px-10 border border-ghoul-gray">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-900/20 border-l-4 border-ghoul-red p-4">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-ghoul-muted">
                                Nome Completo
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-ghoul-gray rounded-md shadow-sm placeholder-ghoul-gray bg-ghoul-black text-ghoul-white focus:outline-none focus:ring-ghoul-red focus:border-ghoul-red sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-ghoul-muted">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-ghoul-gray rounded-md shadow-sm placeholder-ghoul-gray bg-ghoul-black text-ghoul-white focus:outline-none focus:ring-ghoul-red focus:border-ghoul-red sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-ghoul-muted">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-ghoul-gray rounded-md shadow-sm placeholder-ghoul-gray bg-ghoul-black text-ghoul-white focus:outline-none focus:ring-ghoul-red focus:border-ghoul-red sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-bold text-white bg-ghoul-red hover:bg-ghoul-blood disabled:opacity-50 transition-all duration-200 uppercase tracking-wider"
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </button>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={handleDemoLogin}
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Carregando...' : 'Acesso Demo'}
                        </button>
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/login"
                            className="w-full flex justify-center py-2 px-4 border border-ghoul-gray rounded-md shadow-sm text-sm font-medium text-ghoul-white bg-ghoul-black hover:bg-ghoul-gray transition-colors"
                        >
                            Fazer Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
