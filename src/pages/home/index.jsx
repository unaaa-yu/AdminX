import { Col, Row, Card } from 'antd'
import userAvatar from '../../assets/images/user.png'
import styles from './home.module.css'

const Home = () => {
    return (
        <Row className={styles['home']}>
            <Col span={8}>
                <Card hoverable>
                    <div className={styles['user']}>
                        <img src={userAvatar}/>
                        <div className={styles['user-info']}>
                            <p className={styles['name']}>Admin</p>
                            <p className={styles['access']}>超级管理员</p>
                        </div>
                    </div>
                    <div className={styles['login-info']}>
                        <p>上次登录时间：<span>2026-04-07</span></p>
                    </div>
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home