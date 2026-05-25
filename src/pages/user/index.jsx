import { useState, useEffect } from 'react'
import {
    Button, DatePicker, Form, Input, message,
    Modal, Popconfirm, Select, Space, Table, Tag
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { createUser, deleteUser, getUserList, updateUser } from '../../api/user'

const User = () => {
    const [tableData, setTableData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchName, setSearchName] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editRecord, setEditRecord] = useState(null)
    const [form] = Form.useForm()

    const fetchData = async (params = {}) => {
        setLoading(true)
        try {
            const { data } = await getUserList({ name: searchName, page, limit: 20, ...params })
            setTableData(data.list)
            setTotal(data.count)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [page])

    const handleSearch = () => {
        setPage(1)
        fetchData({ page: 1 })
    }

    const openAdd = () => {
        setEditRecord(null)
        form.resetFields()
        setModalOpen(true)
    }

    const openEdit = (record) => {
        setEditRecord(record)
        form.setFieldsValue({
            ...record,
            birth: dayjs(record.birth),
            sex: String(record.sex)
        })
        setModalOpen(true)
    }

    const handleDelete = async (id) => {
        await deleteUser({ id })
        message.success('删除成功')
        fetchData()
    }

    const handleSubmit = async () => {
        const values = await form.validateFields()
        const payload = { ...values, birth: values.birth.format('YYYY-MM-DD') }
        if (editRecord) {
            await updateUser({ ...payload, id: editRecord.id })
            message.success('编辑成功')
        } else {
            await createUser(payload)
            message.success('添加成功')
        }
        setModalOpen(false)
        fetchData()
    }

    const columns = [
        { title: '姓名', dataIndex: 'name', width: 100 },
        { title: '地址', dataIndex: 'addr', ellipsis: true },
        { title: '年龄', dataIndex: 'age', width: 70 },
        { title: '出生日期', dataIndex: 'birth', width: 120 },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 80,
            render: (val) => (
                <Tag color={val ? 'blue' : 'pink'}>{val ? '男' : '女'}</Tag>
            )
        },
        {
            title: '操作',
            width: 140,
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => openEdit(record)}>
                        编辑
                    </Button>
                    <Popconfirm
                        title="确认删除该用户？"
                        onConfirm={() => handleDelete(record.id)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type="primary" danger size="small">删除</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="搜索姓名/地址"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    onPressEnter={handleSearch}
                    prefix={<SearchOutlined />}
                    style={{ width: 220 }}
                    allowClear
                />
                <Button type="primary" onClick={handleSearch}>搜索</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    新增用户
                </Button>
            </Space>

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={tableData}
                pagination={{
                    total,
                    current: page,
                    pageSize: 20,
                    showTotal: (t) => `共 ${t} 条`,
                    onChange: (p) => setPage(p)
                }}
            />

            <Modal
                title={editRecord ? '编辑用户' : '新增用户'}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText="确认"
                cancelText="取消"
                destroyOnClose
            >
                <Form form={form} labelCol={{ span: 5 }} style={{ marginTop: 16 }}>
                    <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="addr" label="地址" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="年龄" rules={[{ required: true }]}>
                        <Input type="number" min={1} max={120} />
                    </Form.Item>
                    <Form.Item name="birth" label="出生日期" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
                        <Select
                            options={[
                                { label: '男', value: '1' },
                                { label: '女', value: '0' }
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User
