import { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, Table } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'
import userAvatar from '../../assets/images/user.png'
import styles from './home.module.css'
import { getData } from '../../api/user'

const purchaseColumns = [
    { title: 'Course',          dataIndex: 'name' },
    { title: "Today's Buys",   dataIndex: 'todayBuy' },
    { title: 'Monthly Buys',   dataIndex: 'monthBuy' },
    { title: 'Total Buys',     dataIndex: 'totalBuy' },
]

const brands = ['Apple', 'Samsung', 'Google', 'Motorola', 'OnePlus', 'Sony']

const stats = [
    { icon: <CheckCircleOutlined />, color: '#2ec7c9', value: '1,234', label: "Today's Paid Orders" },
    { icon: <ClockCircleOutlined />, color: '#ffb980', value: '3,421', label: "Today's Saved Orders" },
    { icon: <CloseCircleOutlined />, color: '#5ab1ef', value: '1,234', label: "Today's Unpaid Orders" },
    { icon: <CheckCircleOutlined />, color: '#2ec7c9', value: '1,234', label: 'Monthly Paid Orders' },
    { icon: <ClockCircleOutlined />, color: '#ffb980', value: '3,421', label: 'Monthly Saved Orders' },
    { icon: <CloseCircleOutlined />, color: '#5ab1ef', value: '1,234', label: 'Monthly Unpaid Orders' },
]

const StatCard = ({ icon, color, value, label }) => (
    <div style={{
        background: '#fff',
        borderRadius: 4,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
        <div style={{
            width: 44, height: 44, background: color, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#fff', flexShrink: 0
        }}>
            {icon}
        </div>
        <div>
            <p style={{ fontSize: 18, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>¥ {value}</p>
            <p style={{ fontSize: 12, color: '#999', margin: 0 }}>{label}</p>
        </div>
    </div>
)

const Home = () => {
    const [tableData, setTableData] = useState([])
    const [chartData, setChartData] = useState(null)
    const barRef  = useRef(null)
    const lineRef = useRef(null)
    const pieRef  = useRef(null)

    useEffect(() => {
        getData().then(({ data }) => {
            const { tableData, userData, orderData, videoData } = data.data
            setTableData(tableData)
            setChartData({ userData, orderData, videoData })
        })
    }, [])

    useEffect(() => {
        if (!chartData) return

        const line = echarts.init(lineRef.current)
        line.setOption({
            grid: { top: 8, right: 8, bottom: 28, left: 42 },
            tooltip: { trigger: 'axis' },
            xAxis: { data: chartData.orderData.date, axisLabel: { fontSize: 10 } },
            yAxis: { axisLabel: { fontSize: 10 } },
            series: brands.map(brand => ({
                name: brand, type: 'line', smooth: true,
                symbolSize: 4,
                data: chartData.orderData.data.map(item => item[brand])
            }))
        })

        const bar = echarts.init(barRef.current)
        bar.setOption({
            grid: { top: 28, right: 8, bottom: 28, left: 42 },
            tooltip: { trigger: 'axis' },
            legend: { data: ['New Users', 'Active Users'], top: 0, textStyle: { fontSize: 10 } },
            xAxis: { data: chartData.userData.map(d => d.date), axisLabel: { fontSize: 10 } },
            yAxis: { axisLabel: { fontSize: 10 } },
            series: [
                { name: 'New Users',    type: 'bar', data: chartData.userData.map(d => d.new) },
                { name: 'Active Users', type: 'bar', data: chartData.userData.map(d => d.active) },
            ]
        })

        const pie = echarts.init(pieRef.current)
        pie.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
            legend: { orient: 'vertical', right: 5, top: 'center', textStyle: { fontSize: 10 } },
            series: [{
                type: 'pie', radius: '65%', center: ['38%', '50%'],
                data: chartData.videoData, label: { show: false }
            }]
        })

        const handleResize = () => { line.resize(); bar.resize(); pie.resize() }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            line.dispose(); bar.dispose(); pie.dispose()
        }
    }, [chartData])

    return (
        <div className={styles.home}>
            <Row gutter={20}>
                <Col span={8}>
                    <Card size="small">
                        <div className={styles.user}>
                            <img src={userAvatar} alt="avatar" />
                            <div className={styles['user-info']}>
                                <p className={styles.name}>Admin</p>
                                <p className={styles.access}>Super Admin</p>
                            </div>
                        </div>
                        <div className={styles['login-info']}>
                            <p>Last Login:<span>2026-04-07</span></p>
                            <p>Last Location:<span>Toronto, ON</span></p>
                        </div>
                    </Card>
                    <Card size="small" style={{ marginTop: 12 }}>
                        <Table
                            rowKey="name"
                            size="small"
                            columns={purchaseColumns}
                            dataSource={tableData}
                            pagination={false}
                        />
                    </Card>
                </Col>

                <Col span={16}>
                    <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
                        {stats.map((s, i) => (
                            <Col span={8} key={i}><StatCard {...s} /></Col>
                        ))}
                    </Row>
                    <Card size="small" style={{ marginBottom: 10 }}>
                        <div ref={lineRef} style={{ height: 148 }} />
                    </Card>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Card size="small">
                                <div ref={barRef} style={{ height: 148 }} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small">
                                <div ref={pieRef} style={{ height: 148 }} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home
