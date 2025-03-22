import { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline';
import userService from '../../services/userService';


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });

  const getAllUser = async() => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Tải danh sách người dùng thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Handle delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        setIsLoading(true);
        await userService.deleteUser(id);
        // Refresh user list after successful deletion
        getAllUser();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Xóa người dùng thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setIsAddUserModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      if (editingUser) {
        // Update existing user
        await userService.updateUser(editingUser.id, formData);
      } else {
        // Add new user
        await userService.createUser(formData);
      }
      
      // Close modal and refresh user list
      setIsAddUserModalOpen(false);
      getAllUser();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Student'
      });
      setEditingUser(null);
      
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Lưu thông tin người dùng thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render sort icon
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' 
      ? <ArrowUpIcon className="w-4 h-4 ml-1" />
      : <ArrowDownIcon className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Quản lý người dùng</h3>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setEditingUser(null);
              setFormData({
                name: '',
                email: '',
                password: '',
                role: 'Student'
              });
              setIsAddUserModalOpen(true);
            }}
            disabled={isLoading}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Thêm người dùng mới
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">Tất cả</option>
              <option value="student">Học viên</option>
              <option value="teacher">Giáo viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
            
            {/* <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select> */}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Họ tên {renderSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center">
                    Email {renderSortIcon('email')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('role')}
                >
                  <div className="flex items-center">
                    Vai trò {renderSortIcon('role')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' || user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'teacher' || user.role === 'Teacher' || user.role === 'instructor' || user.role === 'Instructor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' || user.role === 'Admin' 
                          ? 'Quản trị viên'
                          : user.role === 'teacher' || user.role === 'Teacher' || user.role === 'instructor' || user.role === 'Instructor'
                            ? 'Giáo viên' 
                            : 'Học viên'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex item-center">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => handleEditUser(user)}
                        disabled={isLoading}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isLoading}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                   Hiện chưa có dữ liệu nào!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Hiển thị {filteredUsers.length} / {users.length} người dùng
          </p>
        </div>
      </div>
      
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu {editingUser && <span className="text-xs text-gray-500">(Để trống nếu muốn giữ mật khẩu hiện tại)</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingUser}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Student">Học viên</option>
                    <option value="Teacher">Giáo viên</option>
                    <option value="Admin">Quản trị viên</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsAddUserModalOpen(false)}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                      Đang xử lý...
                    </span>
                  ) : (
                    editingUser ? 'Lưu thay đổi' : 'Thêm người dùng'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement; 