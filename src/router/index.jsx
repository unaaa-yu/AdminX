import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import App from '../App'
import Home from '../pages/home'
import Login from '../pages/login'

const Mall = lazy(() => import('../pages/products'))
const User = lazy(() => import('../pages/user'))
const PageOne = lazy(() => import('../pages/other/pageOne'))
const PageTwo = lazy(() => import('../pages/other/pageTwo'))

const RequireAuth = ({ children }) => {
    const token = useSelector(state => state.auth.token)
    if (!token) return <Navigate to="/login" replace />
    return children
}

const childrenRoutes = [
    { path: '/', element: <Navigate to="home" /> },
    { path: 'home', element: <Home /> },
    { path: 'mall', element: <Suspense fallback={null}><Mall /></Suspense> },
    { path: 'user', element: <Suspense fallback={null}><User /></Suspense> },
    {
        path: 'other',
        children: [
            { path: 'pageone', element: <Suspense fallback={null}><PageOne /></Suspense> },
            { path: 'pagetwo', element: <Suspense fallback={null}><PageTwo /></Suspense> }
        ]
    }
]

const routes = [
    { path: '/login', element: <Login /> },
    {
        path: '/',
        element: <RequireAuth><App /></RequireAuth>,
        children: childrenRoutes
    }
]

export default createBrowserRouter(routes)
