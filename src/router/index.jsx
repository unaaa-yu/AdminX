import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import App from '../App'
import Home from '../pages/home'

// 懒加载页面
const Products = lazy(() => import('../pages/products'))
const User = lazy(() => import('../pages/user'))
const PageOne = lazy(() => import('../pages/other/pageOne'))
const PageTwo = lazy(() => import('../pages/other/pageTwo'))

// 设置路由
const childrenRoutes = [
    // 重定向
    {path: '/', element: <Navigate to='home' />},
    {path: 'home', element: <Home />},
    {path: 'products', element: <Products />},
    {path: 'user', element: <User />},
    {
        path: 'other', 
        children: [
            {path: 'pageone', element: <PageOne />},
            {path: 'pagetwo', element: <PageTwo />}
        ]
    }
]

const routes = [
    {
        path: '/',
        element: <App />,
        children: childrenRoutes
    }
]

export default createBrowserRouter(routes)