import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar, Breadcrumb, Button, Dropdown, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import userAvatar from '../assets/images/user.png'
import { collapsePanel } from '../store/reducer/tab'
import { clearUserInfo } from '../store/reducer/auth'

const { Header } = Layout

const routeLabels = {
    '/home':          'Home',
    '/mall':          'Products',
    '/user':          'Users',
    '/other':         'Other',
    '/other/pageone': 'Page 1',
    '/other/pagetwo': 'Page 2',
}

const MainHeader = ({ collapsed }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const getBreadcrumbs = () => {
        const parts = location.pathname.split('/').filter(Boolean)
        const crumbs = [{ title: 'Home' }]
        let path = ''
        for (const part of parts) {
            path += '/' + part
            const label = routeLabels[path]
            if (label && path !== '/home') {
                crumbs.push({ title: label })
            }
        }
        return crumbs
    }

    const logout = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }

    const dropdownItems = [
        { key: '1', label: <span>Profile</span> },
        { key: '2', label: <span onClick={logout}>Sign Out</span> },
    ]

    return (
        <Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    style={{ fontSize: '16px', width: 40, height: 40, backgroundColor: '#fff' }}
                    onClick={() => dispatch(collapsePanel())}
                />
                <Breadcrumb items={getBreadcrumbs()} />
            </div>
            <Dropdown menu={{ items: dropdownItems }}>
                <Avatar src={userAvatar} style={{ cursor: 'pointer' }} />
            </Dropdown>
        </Header>
    )
}

export default MainHeader
