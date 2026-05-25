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
        message.success('Deleted successfully')
        fetchData()
    }

    const handleSubmit = async () => {
        const values = await form.validateFields()
        const payload = { ...values, birth: values.birth.format('YYYY-MM-DD') }
        if (editRecord) {
            await updateUser({ ...payload, id: editRecord.id })
            message.success('Updated successfully')
        } else {
            await createUser(payload)
            message.success('Added successfully')
        }
        setModalOpen(false)
        fetchData()
    }

    const columns = [
        { title: 'Name',     dataIndex: 'name', width: 140 },
        { title: 'Address',  dataIndex: 'addr', ellipsis: true },
        { title: 'Age',      dataIndex: 'age',  width: 70 },
        { title: 'Birthday', dataIndex: 'birth', width: 120 },
        {
            title: 'Gender',
            dataIndex: 'sex',
            width: 90,
            render: (val) => (
                <Tag color={val ? 'blue' : 'pink'}>{val ? 'Male' : 'Female'}</Tag>
            )
        },
        {
            title: 'Actions',
            width: 140,
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => openEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger size="small">Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by name / address"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    onPressEnter={handleSearch}
                    prefix={<SearchOutlined />}
                    style={{ width: 240 }}
                    allowClear
                />
                <Button type="primary" onClick={handleSearch}>Search</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    Add User
                </Button>
            </Space>

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={tableData}
                scroll={{ y: 'calc(100vh - 360px)' }}
                pagination={{
                    total,
                    current: page,
                    pageSize: 20,
                    showTotal: (t) => `Total: ${t}`,
                    onChange: (p) => setPage(p)
                }}
            />

            <Modal
                title={editRecord ? 'Edit User' : 'Add User'}
                open={modalOpen}
                onOk={handleSubmit}
                onCancel={() => setModalOpen(false)}
                okText="Confirm"
                cancelText="Cancel"
                destroyOnClose
            >
                <Form form={form} labelCol={{ span: 6 }} style={{ marginTop: 16 }}>
                    <Form.Item name="name"  label="Name"     rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="addr"  label="Address"  rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age"   label="Age"      rules={[{ required: true }]}>
                        <Input type="number" min={1} max={120} />
                    </Form.Item>
                    <Form.Item name="birth" label="Birthday" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="sex"   label="Gender"   rules={[{ required: true }]}>
                        <Select options={[
                            { label: 'Male',   value: '1' },
                            { label: 'Female', value: '0' }
                        ]} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User
