import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async(values) => {
    setLoading(true);
    try {
      console.log('Đang gửi yêu cầu đăng nhập với:', values);
      const response = await userService.login(values);
      
      // Log toàn bộ response để debug
      console.log('Raw response:', response);
      console.log('Response data:', response.data);
      
      // Phân tích cấu trúc phản hồi
      if (response && response.data) {
        const data = response.data;
        
        // Nếu API trả về cấu trúc success/data
        if (data.status === 'success' && data.data) {
          const responseData = data.data;
          console.log('Response data structure:', responseData);
          
          // Xử lý trường hợp dữ liệu người dùng ở dạng mảng với key là số
          let user;
          let token;
          
          if (responseData[0]) {
            // Trường hợp người dùng ở responseData[0]
            user = responseData[0];
            token = responseData.token;
          } else if (typeof responseData === 'object') {
            // Hoặc có thể là đối tượng phẳng
            user = {
              id: responseData.id,
              name: responseData.name,
              email: responseData.email,
              role: responseData.role,
              avatar: responseData.avatar
            };
            token = responseData.token;
          }
          
          console.log('Parsed user:', user);
          console.log('Token:', token);
          
          if (user && token) {
            // Tạo đối tượng userData với cấu trúc phù hợp
            const userData = {
              token: token,
              role: user.role || 'student',
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar
            };
            
            console.log('Final userData for login:', userData);
            // Gọi hàm login từ AuthContext
            login(userData);
            message.success('Đăng nhập thành công!');
          } else {
            throw new Error('Không tìm thấy thông tin người dùng hoặc token');
          }
        } else if (data.token) {
          // Hoặc có thể API trả về token trực tiếp ở root
          const userData = {
            token: data.token,
            role: data.role || 'student',
            id: data.id,
            name: data.name,
            email: data.email
          };
          
          console.log('Direct userData for login:', userData);
          login(userData);
          message.success('Đăng nhập thành công!');
        } else {
          throw new Error('Cấu trúc dữ liệu không hợp lệ');
        }
      } else {
        throw new Error('Không nhận được phản hồi từ server');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      message.error(`Đăng nhập thất bại: ${error.message || 'Vui lòng kiểm tra lại thông tin'}`);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
