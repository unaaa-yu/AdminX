import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, theme } from 'antd';
import './App.css'
import Aside from './components/Aside'
import MainHeader from './components/MainHeader'

const { Header, Sider, Content } = Layout;

const App = () => {
	const {
	  token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const collapsed = useSelector(state => state.tab.isCollapse)

	return (
	  <Layout className='main-container' style={{height: '100vh'}}>
		<Aside collapsed={collapsed}/>
		<Layout>
		  <MainHeader collapsed={collapsed}/>
		  <Content
			style={{
			  margin: '24px 16px',
			  padding: 24,
			  minHeight: 280,
			  background: colorBgContainer,
			  borderRadius: borderRadiusLG,
			}}
		  >
			<Outlet />
		  </Content>
		</Layout>
	  </Layout>
	);
  };

export default App;