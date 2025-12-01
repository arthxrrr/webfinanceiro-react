import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Wallet } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { signIn } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(email, password)
            navigate('/')
        } catch (err) {
            setError('Falha ao fazer login. Verifique suas credenciais.')
            console.error(err)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-ghoul-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Wallet className="h-12 w-12 text-ghoul-red animate-pulse" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-ghoul-white tracking-widest">
                    Arthur<span className="text-ghoul-red"> Henrique</span>
                </h2>
                <p className="mt-2 text-center text-sm text-ghoul-muted">
                    Entre na sua conta
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-ghoul-dark py-8 px-4 shadow-2xl shadow-ghoul-red/10 sm:rounded-lg sm:px-10 border border-ghoul-gray">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-900/20 border-l-4 border-ghoul-red p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-400">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-ghoul-muted">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-ghoul-gray rounded-md shadow-sm placeholder-ghoul-gray bg-ghoul-black text-ghoul-white focus:outline-none focus:ring-ghoul-red focus:border-ghoul-red sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-ghoul-muted">
                                Senha
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-ghoul-gray rounded-md shadow-sm placeholder-ghoul-gray bg-ghoul-black text-ghoul-white focus:outline-none focus:ring-ghoul-red focus:border-ghoul-red sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-ghoul-red hover:bg-ghoul-blood focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ghoul-black focus:ring-ghoul-red disabled:opacity-50 transition-all duration-200 uppercase tracking-wider"
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-ghoul-gray" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-ghoul-dark text-ghoul-muted">
                                    Não tem uma conta?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/register"
                                className="w-full flex justify-center py-2 px-4 border border-ghoul-gray rounded-md shadow-sm text-sm font-medium text-ghoul-white bg-ghoul-black hover:bg-ghoul-gray transition-colors"
                            >
                                Criar nova conta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
