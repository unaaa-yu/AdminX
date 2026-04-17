import { useDispatch } from 'react-redux'
import { Avatar, Button, Layout, Dropdown } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'
import userAvatar from '../assets/images/user.png'
import { collapsePanel }from '../store/reducer/tab'

const { Header } = Layout;

const MainHeader = ({ collapsed }) => {
	const logout = () => {

	}
	const items = [
		{
			key: '1', 
			label: (
			<a target=" _blank" rel="noopener noreferrer">
				个人中心
			</a >
			),
		},
	    {
			key: '2',
			label: (
			<a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
				退出
			</a>
			),
		},
	]

	// 获取dispatch
	const dispatch = useDispatch()

    return (
        <Header style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'}}
		>
			<Button
			  type="text"
			  icon={<MenuFoldOutlined />}
			  style={{
				fontSize: '16px',
				width: 64,
				height: 32,
				backgroundColor: '#fff'
			  }}
			  onClick={() => dispatch(collapsePanel())}
			/>
			<Dropdown menu={{items}}>
				<Avatar src={userAvatar} />
			</Dropdown>
		</Header>
    )
}

export default MainHeader