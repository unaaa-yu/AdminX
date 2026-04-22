import { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import userAvatar from '../../assets/images/user.png'
import styles from './home.module.css'
import { getData } from '../../api/user'

const columns = [
    {
      title: '课程',
      dataIndex: 'name'
    },
    {
      title: '今日购买',
      dataIndex: 'todayBuy'
    },
    {
      title: '本月购买',
      dataIndex: 'monthBuy'
    },
    {
      title: '总购买',
      dataIndex: 'totalBuy'
    }
]

const Home = () => {
    useEffect(() => {
        getData().then(({ data }) => {
            const { tableData } = data.data
            setTableData(tableData)
        })
    }, [])

    const [tableData, setTableData] = useState([])

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
                <Card>
                    <Table rowKey={'name'} columns={columns} dataSource={tableData} pagination={false}/>
                </Card>
            </Col>
            <Col span={16}></Col>
        </Row>
    )
}

export default Home