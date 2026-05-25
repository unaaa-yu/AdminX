import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import MenuConfig from '../config'

const { Sider } = Layout

const handleIcon = (iconName) =>
    React.createElement(Icon[iconName] || Icon.AppstoreOutlined)

// Map permission API paths → router paths
const permPathToRoute = {
    '/page1': '/other/pageone',
    '/page2': '/other/pagetwo',
    '/':      '/home',
    '/video': '/mall',
}
const toRoute = (path) => permPathToRoute[path] || path

// Build menu items from static config, filtered by allowed paths from auth menu.
// Labels always come from the config (English) — never from stored auth data.
const buildItems = (config, authMenu) => {
    const allowed = new Set()
    if (authMenu?.length) {
        authMenu.forEach(item => {
            if (item.path) allowed.add(toRoute(item.path))
            item.children?.forEach(c => { if (c.path) allowed.add(toRoute(c.path)) })
        })
    }

    return config
        .filter(item =>
            !allowed.size ||
            allowed.has(item.path) ||
            item.children?.some(c => allowed.has(c.path))
        )
        .map(item => {
            const entry = {
                key: item.path,
                icon: handleIcon(item.icon),
                label: item.label,
            }
            if (item.children) {
                entry.children = item.children
                    .filter(c => !allowed.size || allowed.has(c.path))
                    .map(c => ({ key: c.path, label: c.label }))
            }
            return entry
        })
}

const Aside = ({ collapsed }) => {
    const navigate  = useNavigate()
    const location  = useLocation()
    const authMenu  = useSelector(state => state.auth.menu)
    const [openKeys, setOpenKeys] = useState([])

    useEffect(() => {
        const parts = location.pathname.split('/').filter(Boolean)
        setOpenKeys(parts.length > 1 ? [`/${parts[0]}`] : [])
    }, [location.pathname])

    const items = buildItems(MenuConfig, authMenu)

    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className="app-name">{!collapsed ? 'AdminX' : ''}</h3>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                openKeys={collapsed ? [] : openKeys}
                onOpenChange={setOpenKeys}
                onClick={({ key }) => navigate(key)}
                items={items}
            />
        </Sider>
    )
}

export default Aside
