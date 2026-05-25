import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import MenuConfig from '../config'

const { Sider } = Layout

const handleIcon = (iconName) =>
    React.createElement(Icon[iconName] || Icon.AppstoreOutlined)

// Map permission API icon names → Ant Design icon names
const iconMap = {
    's-home': 'HomeOutlined',
    'video-play': 'ShopOutlined',
    'user': 'UserOutlined',
    'location': 'SettingOutlined',
    'setting': 'SettingOutlined',
}

// Map permission API paths → actual router paths
const permPathToRoute = {
    '/page1': '/other/pageone',
    '/page2': '/other/pagetwo',
    '/': '/home',
    '/video': '/mall',
}
const getRoutePath = (path) => permPathToRoute[path] || path

// Build from static config (fallback)
const buildStaticItems = (config) =>
    config.map((item) => {
        const child = {
            key: item.path,
            icon: handleIcon(item.icon),
            label: item.label,
        }
        if (item.children) {
            child.children = item.children.map((c) => ({
                key: c.path,
                label: c.label,
            }))
        }
        return child
    })

// Build from RBAC permission menu (post-login)
const buildDynamicItems = (menu) =>
    menu.map((item, i) => {
        const iconName = iconMap[item.icon] || 'AppstoreOutlined'
        const child = {
            key: item.path ? getRoutePath(item.path) : `sub_${i}`,
            icon: handleIcon(iconName),
            label: item.label,
        }
        if (item.children) {
            child.children = item.children.map((c) => ({
                key: getRoutePath(c.path),
                label: c.label,
            }))
        }
        return child
    })

const Aside = ({ collapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const authMenu = useSelector(state => state.auth.menu)

    const [openKeys, setOpenKeys] = useState([])

    useEffect(() => {
        const parts = location.pathname.split('/').filter(Boolean)
        if (parts.length > 1) {
            setOpenKeys([`/${parts[0]}`])
        } else {
            setOpenKeys([])
        }
    }, [location.pathname])

    const items = authMenu?.length > 0
        ? buildDynamicItems(authMenu)
        : buildStaticItems(MenuConfig)

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
