import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useIsAdmin, useIsTeacher, useIsStudent } from '../../hooks/useRoleCheck';

const RoleBasedComponent = () => {
  const { currentUser, logout } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { isTeacher } = useIsTeacher();
  const { isStudent } = useIsStudent();

  if (!currentUser) {
    return <div>Bạn cần đăng nhập để xem nội dung này.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nội dung dựa trên vai trò</h2>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="mb-2"><strong>Người dùng hiện tại:</strong> {currentUser.name}</p>
        <p className="mb-2"><strong>Email:</strong> {currentUser.email}</p>
        <p className="mb-2"><strong>Vai trò:</strong> {currentUser.role}</p>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>

      {/* Nội dung chỉ dành cho Admin */}
      {isAdmin && (
        <div className="bg-blue-100 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Chức năng Admin</h3>
          <ul className="list-disc pl-5">
            <li>Quản lý tất cả người dùng</li>
            <li>Quản lý khóa học</li>
            <li>Xem báo cáo phân tích</li>
            <li>Cài đặt hệ thống</li>
          </ul>
        </div>
      )}

      {/* Nội dung dành cho Teacher */}
      {isTeacher && (
        <div className="bg-green-100 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Chức năng Giảng viên</h3>
          <ul className="list-disc pl-5">
            <li>Quản lý khóa học của bạn</li>
            <li>Quản lý danh mục</li>
            <li>Tạo và chỉnh sửa bài giảng</li>
            <li>Xem tiến độ học viên</li>
          </ul>
        </div>
      )}

      {/* Nội dung dành cho Student */}
      {isStudent && (
        <div className="bg-yellow-100 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Chức năng Học viên</h3>
          <ul className="list-disc pl-5">
            <li>Xem các khóa học đã đăng ký</li>
            <li>Tham gia các bài học và bài kiểm tra</li>
            <li>Theo dõi tiến độ học tập</li>
            <li>Tham gia diễn đàn thảo luận</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoleBasedComponent; 