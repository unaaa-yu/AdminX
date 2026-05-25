import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import { setUserInfo } from '../../store/reducer/auth'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async ({ username, password }) => {
        try {
            const { data } = await login({ username, password })
            if (data.code === 20000) {
                dispatch(setUserInfo({
                    token: data.data.token,
                    username,
                    menu: data.data.menu
                }))
                navigate('/home')
            } else {
                message.error(data.data.message)
            }
        } catch {
            message.error('登录失败，请重试')
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)'
        }}>
            <Card
                title={<span style={{ fontSize: 20 }}>AdminX 管理系统</span>}
                style={{ width: 400, borderRadius: 8 }}
            >
                <p style={{ color: '#999', marginBottom: 24, textAlign: 'center' }}>
                    测试账号：admin / admin　或　xiaoxiao / xiaoxiao
                </p>
                <Form onFinish={onFinish} autoComplete="off" size="large">
                    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
