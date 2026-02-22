import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WriterWorkspace from './pages/WriterWorkspace'
import SessionsPage from './pages/SessionsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import GeneratorPage from './pages/GeneratorPage'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { AnimatePresence, motion } from 'framer-motion'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return null
    return user ? children : <Navigate to="/login" />
}

const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    return (
        <div className="min-h-screen bg-darkBg text-white flex overflow-hidden">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[260px]' : 'ml-[80px]'} h-screen overflow-y-auto`}>
                <div className="p-8">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="writer" element={<WriterWorkspace />} />
                        <Route path="generator" element={<GeneratorPage />} />
                        <Route path="sessions" element={<SessionsPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected App Routes */}
                <Route path="/app/*" element={
                    <PrivateRoute>
                        <AppLayout />
                    </PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App
