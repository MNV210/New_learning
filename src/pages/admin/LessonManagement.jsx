import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Table, Typography, Input, Space, Card, Button, Tag, Tooltip, 
  Modal, Form, Select, Upload, message 
} from 'antd';
import { 
  SearchOutlined, BookOutlined, EditOutlined, DeleteOutlined, 
  PlusOutlined, UploadOutlined, VideoCameraOutlined, FileOutlined 
} from '@ant-design/icons';

import { courseService } from '../../services';
import '../../assets/LessonManagement.css'
import lessonService from '../../services/lessonService';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;


const LessonManagement = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [form] = Form.useForm();

    const params = useParams();

    const getLessonByCourseId = async() => {
        const response = await courseService.getLessonByCourseId(params.id);
        console.log(response.data);
        setLoading(true);
        setTimeout(() => {
            setLessons(response.data);
            setFilteredLessons(response.data);
            setLoading(false);
        }, 1000);
    }

    // lấy danh sách khóa học theo course_id
    useEffect(() => async() =>{
        getLessonByCourseId()
    }, [courseId]);

    // Xử lý tìm kiếm
    const handleSearch = (value) => {
        setSearchText(value);
        if (!value) {
            setFilteredLessons(lessons);
            return;
        }

        const filtered = lessons.filter(
            lesson => 
                lesson.title.toLowerCase().includes(value.toLowerCase()) ||
                lesson.content.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLessons(filtered);
    };

    // Hiển thị icon loại tệp
    const getTypeIcon = (type) => {
        return type === 'video' 
            ? <VideoCameraOutlined style={{ color: '#ff4d4f' }} /> 
            : <FileOutlined style={{ color: '#1890ff' }} />;
    };

    // Mở modal tạo/chỉnh sửa
    const showModal = (lesson = null) => {
        setEditingLesson(lesson);
        if (lesson) {
            form.setFieldsValue(lesson);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Xử lý submit form
    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                if (editingLesson) {
                    // Cập nhật bài học
                    const updatedLessons = lessons.map(lesson => 
                        lesson.id === editingLesson.id ? { ...lesson, ...values } : lesson
                    );
                    setLessons(updatedLessons);
                    setFilteredLessons(updatedLessons);
                    message.success('Cập nhật bài học thành công!');
                } else {
                    // Tạo bài học mới
                    const newLesson = {
                        id: lessons.length + 1,
                        ...values,
                        status: 'draft'
                    };
                    const newLessons = [...lessons, newLesson];
                    setLessons(newLessons);
                    setFilteredLessons(newLessons);
                    message.success('Tạo bài học mới thành công!');
                }
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch(info => {
                console.log('Lỗi khi xác thực:', info);
            });
    };

    // Xử lý xóa bài học
    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa bài học này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    const response = await lessonService.deleteLesson(id);
                    console.log(response);
                    if (response.status === 'success') {
                        await getLessonByCourseId();
                        message.success('Xóa bài học thành công!');
                    }
                } catch (error) {
                    message.error('Xóa bài học thất bại!');
                }
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            render: (text) => (
                <Space>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: '30%',
            ellipsis: true,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            align: 'center',
            render: (type) => (
                <Space>
                    {getTypeIcon(type)}
                    <Text>{type === 'video' ? 'Video' : 'Tài liệu'}</Text>
                </Space>
            ),
        },
        {
            title: 'File URL',
            dataIndex: 'file_url',
            key: 'file_url',
            width: '15%',
            ellipsis: true,
            render: (url) => (
                url ? (
                    <Tooltip title={url}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url.substring(0, 20)}...
                        </a>
                    </Tooltip>
                ) : (
                    <Text type="secondary">Không có URL</Text>
                )
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Chỉnh sửa">
                        <Button 
                            type="text" 
                            icon={<EditOutlined />} 
                            size="small" 
                            onClick={() => showModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            size="small" 
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Card 
            className="lesson-management-card"
            style={{ 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
        >
            <div style={{ padding: '0 0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Title level={2} style={{ margin: 0 }}>
                        Khóa học #{courseId}: Quản lý bài học
                    </Title>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                    >
                        Thêm bài học
                    </Button>
                </div>
                
                <Search
                    placeholder="Tìm kiếm theo tiêu đề hoặc nội dung"
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchText}
                    style={{ marginBottom: 16 }}
                />
                
                <Table
                    dataSource={filteredLessons}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ 
                        pageSize: 5,
                        showTotal: (total) => `Tổng cộng ${total} bài học`,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20']
                    }}
                    bordered
                    style={{ 
                        backgroundColor: 'white',
                        borderRadius: '4px',
                    }}
                    rowClassName={(record, index) => 
                        index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                    }
                />
            </div>

            {/* Modal tạo/cập nhật bài học */}
            <Modal
                title={editingLesson ? "Cập nhật bài học" : "Thêm bài học mới"}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        {editingLesson ? "Cập nhật" : "Tạo mới"}
                    </Button>,
                ]}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="lessonForm"
                    initialValues={{ type: 'file' }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Nhập tiêu đề bài học" />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <TextArea 
                            placeholder="Nhập nội dung bài học" 
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    {/* <Form.Item
                        name="type"
                        label="Loại"
                        rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
                    >
                        <Select placeholder="Chọn loại tài liệu">
                            <Option value="video">Video</Option>
                            <Option value="file">Tài liệu</Option>
                        </Select>
                    </Form.Item> */}

                    <Form.Item
                        name="file_url"
                        label="URL tệp"
                        rules={[{ required: true, message: 'Vui lòng nhập URL tệp hoặc tải lên tệp mới!' }]}
                    >
                        <Input placeholder="Nhập URL của tệp" />
                    </Form.Item>

                    <Form.Item label="Hoặc tải lên tệp mới">
                        <Upload 
                            maxCount={1}
                            beforeUpload={(file) => {
                                // Trong thực tế, bạn sẽ xử lý việc tải lên tại đây
                                message.info(`Tệp '${file.name}' sẽ được tải lên sau khi lưu form.`);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Chọn tệp</Button>
                        </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </Card>
    );
};

export default LessonManagement;

