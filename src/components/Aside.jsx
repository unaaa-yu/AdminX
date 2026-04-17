import React from 'react'
import MenuConfig from '../config'
import * as Icon from '@ant-design/icons';
import {  Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

// 动态获取icon
const handleIcon = iconName => {
    return React.createElement(Icon[iconName])
}

// 处理菜单的数据
const items = MenuConfig.map((item) => {
    // 无子菜单
    const child = {
        key: item.path,
        icon: handleIcon(item.icon),
        label: item.label
    }

    // 有子菜单
    if (item.children) {
        child.children = item.children.map((item) => {
            return {
                key: item.path,
                label: item.label
            }
        })
    }

    return child
})

const Aside = ({ collapsed }) => {
    return (
        <Sider trigger={null} collapsed={collapsed}>
		  <h3 className='app-name'>{!collapsed ? 'AdminX' : ''}</h3>
		  <Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={['1']}
			items={items}
		  />
		</Sider>
    )
}

export default Aside