import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
    LayoutDashboard,
    Receipt,
    LogOut,
    Menu,
    X,
    Wallet
} from 'lucide-react'

export default function Layout({ children }) {
    const { signOut, user } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Transações', href: '/transactions', icon: Receipt },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <div className="min-h-screen bg-ghoul-black text-ghoul-white">
            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-ghoul-dark border-r border-ghoul-gray">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ghoul-red"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <Wallet className="h-8 w-8 text-ghoul-red" />
                                <span className="ml-2 text-xl font-bold text-white tracking-wider">Arthur<span className="text-ghoul-red"> Henrique</span></span>
                            </div>
                            <nav className="mt-8 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`${isActive(item.href)
                                            ? 'bg-ghoul-red/10 text-ghoul-red border-l-4 border-ghoul-red'
                                            : 'text-ghoul-muted hover:bg-ghoul-gray/50 hover:text-white'
                                            } group flex items-center px-2 py-3 text-base font-medium transition-all duration-200`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <item.icon
                                            className={`${isActive(item.href) ? 'text-ghoul-red' : 'text-ghoul-muted group-hover:text-white'
                                                } mr-4 flex-shrink-0 h-6 w-6 transition-colors duration-200`}
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-ghoul-gray p-4">
                            <div className="flex-shrink-0 group block w-full">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-ghoul-white">{user?.email}</p>
                                        <button
                                            onClick={signOut}
                                            className="text-xs font-medium text-ghoul-muted group-hover:text-ghoul-red flex items-center mt-1 transition-colors"
                                        >
                                            <LogOut className="mr-1 h-4 w-4" /> Sair
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-ghoul-gray bg-ghoul-dark">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <Wallet className="h-8 w-8 text-ghoul-red" />
                            <span className="ml-2 text-xl font-bold text-white tracking-wider">Arthur<span className="text-ghoul-red"> Henrique</span></span>
                        </div>
                        <nav className="mt-8 flex-1 px-2 bg-ghoul-dark space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${isActive(item.href)
                                        ? 'bg-ghoul-red/10 text-ghoul-red border-l-4 border-ghoul-red'
                                        : 'text-ghoul-muted hover:bg-ghoul-gray/50 hover:text-white'
                                        } group flex items-center px-2 py-3 text-sm font-medium transition-all duration-200`}
                                >
                                    <item.icon
                                        className={`${isActive(item.href) ? 'text-ghoul-red' : 'text-ghoul-muted group-hover:text-white'
                                            } mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200`}
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-ghoul-gray p-4">
                        <div className="flex-shrink-0 w-full group block">
                            <div className="flex items-center">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-ghoul-white truncate w-48">{user?.email}</p>
                                    <button
                                        onClick={signOut}
                                        className="text-xs font-medium text-ghoul-muted group-hover:text-ghoul-red flex items-center mt-1 transition-colors"
                                    >
                                        <LogOut className="mr-1 h-4 w-4" /> Sair
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-ghoul-dark border-b border-ghoul-gray">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-ghoul-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ghoul-red"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
                <main className="flex-1 bg-ghoul-black">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
