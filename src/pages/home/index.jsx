import { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, Table } from 'antd'
import * as echarts from 'echarts'
import userAvatar from '../../assets/images/user.png'
import styles from './home.module.css'
import { getData } from '../../api/user'

const purchaseColumns = [
    { title: '课程', dataIndex: 'name' },
    { title: '今日购买', dataIndex: 'todayBuy' },
    { title: '本月购买', dataIndex: 'monthBuy' },
    { title: '总购买', dataIndex: 'totalBuy' },
]

const brands = ['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']

const Home = () => {
    const [tableData, setTableData] = useState([])
    const [chartData, setChartData] = useState(null)

    const barRef = useRef(null)
    const lineRef = useRef(null)
    const pieRef = useRef(null)

    useEffect(() => {
        getData().then(({ data }) => {
            const { tableData, userData, orderData, videoData } = data.data
            setTableData(tableData)
            setChartData({ userData, orderData, videoData })
        })
    }, [])

    useEffect(() => {
        if (!chartData) return

        const bar = echarts.init(barRef.current)
        bar.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['新增用户', '活跃用户'] },
            xAxis: { data: chartData.userData.map(d => d.date) },
            yAxis: {},
            color: ['#5470c6', '#91cc75'],
            series: [
                { name: '新增用户', type: 'bar', data: chartData.userData.map(d => d.new) },
                { name: '活跃用户', type: 'bar', data: chartData.userData.map(d => d.active) },
            ]
        })

        const line = echarts.init(lineRef.current)
        line.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: brands, top: 0 },
            xAxis: { data: chartData.orderData.date },
            yAxis: {},
            series: brands.map(brand => ({
                name: brand,
                type: 'line',
                smooth: true,
                data: chartData.orderData.data.map(item => item[brand])
            }))
        })

        const pie = echarts.init(pieRef.current)
        pie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'vertical', right: 10, top: 'center' },
            series: [{
                type: 'pie',
                radius: ['40%', '65%'],
                center: ['40%', '50%'],
                data: chartData.videoData,
                label: { show: false }
            }]
        })

        const handleResize = () => {
            bar.resize()
            line.resize()
            pie.resize()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            bar.dispose()
            line.dispose()
            pie.dispose()
        }
    }, [chartData])

    return (
        <div className={styles.home}>
            <Row gutter={20}>
                <Col span={8}>
                    <Card hoverable>
                        <div className={styles.user}>
                            <img src={userAvatar} alt="avatar" />
                            <div className={styles['user-info']}>
                                <p className={styles.name}>Admin</p>
                                <p className={styles.access}>超级管理员</p>
                            </div>
                        </div>
                        <div className={styles['login-info']}>
                            <p>上次登录时间：<span>2026-04-07</span></p>
                        </div>
                    </Card>
                    <Card style={{ marginTop: 20 }}>
                        <Table
                            rowKey="name"
                            columns={purchaseColumns}
                            dataSource={tableData}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="本周用户统计">
                        <div ref={barRef} style={{ height: 300 }} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: 20 }}>
                <Col span={16}>
                    <Card title="近7日品牌销售趋势">
                        <div ref={lineRef} style={{ height: 300 }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="品牌销量占比">
                        <div ref={pieRef} style={{ height: 300 }} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home
