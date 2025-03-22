import { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  DocumentIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { courseService, categoryService } from '../../services';
import { toast } from 'react-toastify';


// Danh mục được định nghĩa sẵn
// ... existing code ...

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Trạng thái form cho modal
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    instructor: '',
    description: '',
    status: 'Draft',
    image: '',
    modules: []
  });
  
  // Tab đang hoạt động trong modal
  const [activeTab, setActiveTab] = useState('details');
  
  // Cho việc chỉnh sửa module
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [moduleFormData, setModuleFormData] = useState({ title: '', materials: [] });
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [materialFormData, setMaterialFormData] = useState({ type: 'video', title: '', file: null });

  // Fetch dữ liệu khóa học và danh mục từ API khi component được mount
  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  // Hàm để lấy danh sách khóa học từ API
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await courseService.getAllCourses();
      const coursesData = response.data || response.courses || [];
      setCourses(coursesData);
    } catch (error) {
      toast.error('Không thể tải khóa học: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Hàm để lấy danh sách danh mục từ API
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      
      const response = await categoryService.getAllCategories();
      const categoriesData = response.data || response.categories || [];
      setCategories(categoriesData.filter(cat => cat.status === 'active'));
      
      // Đặt categoryId mặc định nếu có danh mục
      if (categoriesData.length > 0 && !formData.categoryId) {
        setFormData(prev => ({
          ...prev,
          categoryId: categoriesData[0].id
        }));
      }
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
      toast.error('Không thể tải danh mục: ' + (error.response?.data?.message || error.message));
    } finally {
      setCategoryLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc khóa học
  const filteredCourses = Array.isArray(courses) ? courses.filter(course => {
    // Thêm kiểm tra null để tránh lỗi với giá trị undefined
    const title = course?.title || '';
    const instructor = course?.instructor || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }) : [];

  // Xử lý xóa khóa học
  const handleDeleteCourse = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      try {
        await courseService.deleteCourse(id);
        setCourses(courses.filter(course => course.id !== id));
        toast.success('Đã xóa khóa học thành công');
      } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        toast.error('Không thể xóa khóa học. Vui lòng thử lại.');
      }
    }
  };

  // Xử lý chỉnh sửa khóa học
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      categoryId: course.categoryId || (categories.length > 0 ? categories[0].id : ''),
      instructor: course.instructor,
      description: course.description || '',
      status: course.status,
      image: course.image,
      modules: course.modules || []
    });
    setActiveTab('details');
    setIsAddCourseModalOpen(true);
  };
  
  // Xử lý thêm khóa học mới - đặt lại dữ liệu form
  const handleAddCourse = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      instructor: '',
      description: '',
      status: 'Draft',
      image: '',
      modules: []
    });
    setActiveTab('details');
    setIsAddCourseModalOpen(true);
  };

  // Xử lý form submission khi tạo mới hoặc cập nhật khóa học
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCourse) {
        // Cập nhật khóa học hiện có
        await courseService.updateCourse(editingCourse.id, formData);
        toast.success('Khóa học đã được cập nhật thành công');
      } else {
        // Tạo khóa học mới
        await courseService.createCourse(formData);
        toast.success('Khóa học mới đã được tạo thành công');
      }
      
      // Đóng modal và reset form
      setIsAddCourseModalOpen(false);
      setEditingCourse(null);
      setFormData({
        title: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        instructor: '',
        description: '',
        status: 'Draft',
        image: '',
        modules: []
      });
      
      // Fetch updated data from API
      fetchCourses();
    } catch (error) {
      console.error('Lỗi khi lưu khóa học:', error);
      toast.error('Không thể lưu khóa học. Vui lòng thử lại.');
    }
  };

  // Hiển thị trạng thái đang tải
  if (loading && courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Quản Lý Khóa Học</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Đang tải khóa học...</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Quản Lý Khóa Học</h3>
          <div className="flex space-x-2">
            <button 
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              onClick={fetchCourses}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></span>
                  Đang làm mới...
                </>
              ) : (
                'Làm Mới Khóa Học'
              )}
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleAddCourse}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Thêm Khóa Học Mới
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {loading && courses.length > 0 && (
          <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
            Đang làm mới khóa học...
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="relative aspect-video bg-gray-200">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <DocumentIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.status === 'Published' ? 'Đã Xuất Bản' : 'Bản Nháp'}
                </span>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600 mb-4">Giảng viên: {course.instructor}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    {course.enrolled || 0} học viên
                  </span>
                </div>
                
                <div className="flex border-t border-gray-200 pt-4">
                  <button className="flex-1 flex justify-center items-center text-blue-600 hover:text-blue-800 py-2">
                    <EyeIcon className="w-5 h-5 mr-1" />
                    Xem
                  </button>
                  <button 
                    className="flex-1 flex justify-center items-center text-blue-600 hover:text-blue-800 py-2 border-l border-r border-gray-200"
                    onClick={() => handleEditCourse(course)}
                  >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Sửa
                  </button>
                  <button 
                    className="flex-1 flex justify-center items-center text-red-600 hover:text-red-800 py-2"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <TrashIcon className="w-5 h-5 mr-1" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8 text-gray-500">
              Không tìm thấy khóa học nào phù hợp với tiêu chí của bạn
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Hiển thị {filteredCourses.length} trong số {Array.isArray(courses) ? courses.length : 0} khóa học
          </p>
        </div>
      </div>

      {/* Modal for adding/editing course */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingCourse ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
              </h3>
              <button 
                onClick={() => setIsAddCourseModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-6 py-3 border-b-2 ${
                    activeTab === 'details' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Thông tin cơ bản
                </button>
                <button
                  className={`px-6 py-3 border-b-2 ${
                    activeTab === 'modules' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('modules')}
                  disabled={!editingCourse && !formData.title}
                >
                  Nội dung khóa học
                </button>
              </nav>
            </div>
            
            <form onSubmit={handleSubmitCourse}>
              {activeTab === 'details' && (
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Tên khóa học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên khóa học"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categoryLoading ? (
                        <option value="">Đang tải danh mục...</option>
                      ) : categories.length === 0 ? (
                        <option value="">Không có danh mục</option>
                      ) : (
                        categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
                      Giảng viên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="instructor"
                      name="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên giảng viên"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mô tả khóa học"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Draft">Bản nháp</option>
                      <option value="Published">Xuất bản</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Ảnh khóa học (URL)
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập URL ảnh khóa học"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'modules' && (
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Thêm các module và bài giảng cho khóa học
                  </p>
                  
                  {/* Module list would go here */}
                </div>
              )}
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Hủy bỏ
                </button>
                {activeTab === 'details' && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingCourse ? 'Cập Nhật' : 'Tạo Khóa Học'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement;
