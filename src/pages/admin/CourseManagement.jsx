import { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Sample course data
const initialCourses = [
  { 
    id: 1, 
    title: 'Introduction to JavaScript', 
    category: 'Programming', 
    instructor: 'Michael Brown', 
    enrolled: 156, 
    status: 'Published',
    lastUpdated: '2023-05-15',
    image: 'https://via.placeholder.com/150?text=JS'
  },
  { 
    id: 2, 
    title: 'Advanced React Development', 
    category: 'Web Development', 
    instructor: 'Lisa Martinez', 
    enrolled: 124, 
    status: 'Published',
    lastUpdated: '2023-06-02',
    image: 'https://via.placeholder.com/150?text=React'
  },
  { 
    id: 3, 
    title: 'Python for Data Science', 
    category: 'Data Science', 
    instructor: 'David Anderson', 
    enrolled: 201, 
    status: 'Published',
    lastUpdated: '2023-04-20',
    image: 'https://via.placeholder.com/150?text=Python'
  },
  { 
    id: 4, 
    title: 'UI/UX Design Principles', 
    category: 'Design', 
    instructor: 'Patricia Garcia', 
    enrolled: 89, 
    status: 'Draft',
    lastUpdated: '2023-06-10',
    image: 'https://via.placeholder.com/150?text=UI/UX'
  },
  { 
    id: 5, 
    title: 'Introduction to Machine Learning', 
    category: 'Data Science', 
    instructor: 'David Anderson', 
    enrolled: 145, 
    status: 'Published',
    lastUpdated: '2023-05-28',
    image: 'https://via.placeholder.com/150?text=ML'
  },
  { 
    id: 6, 
    title: 'Mobile App Development with Flutter', 
    category: 'Mobile Development', 
    instructor: 'Michael Brown', 
    enrolled: 78, 
    status: 'Draft',
    lastUpdated: '2023-06-08',
    image: 'https://via.placeholder.com/150?text=Flutter'
  },
];

function CourseManagement() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle delete course
  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Handle edit course
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsAddCourseModalOpen(true);
  };

  // Get unique categories
  const categories = ['All', ...new Set(courses.map(course => course.category))];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Course Management</h3>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setEditingCourse(null);
              setIsAddCourseModalOpen(true);
            }}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Course
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category === 'All' ? 'All Categories' : category}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="relative aspect-video bg-gray-200">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {course.enrolled} students
                    </span>
                  </div>
                  
                  <div className="flex border-t border-gray-200 pt-4">
                    <button className="flex-1 flex justify-center items-center text-blue-600 hover:text-blue-800 py-2">
                      <EyeIcon className="w-5 h-5 mr-1" />
                      View
                    </button>
                    <button 
                      className="flex-1 flex justify-center items-center text-blue-600 hover:text-blue-800 py-2 border-l border-r border-gray-200"
                      onClick={() => handleEditCourse(course)}
                    >
                      <PencilIcon className="w-5 h-5 mr-1" />
                      Edit
                    </button>
                    <button 
                      className="flex-1 flex justify-center items-center text-red-600 hover:text-red-800 py-2"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <TrashIcon className="w-5 h-5 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8 text-gray-500">
              No courses found matching your criteria
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>
      </div>
      
      {/* Modal for adding/editing courses would go here */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <p className="text-gray-600 mb-4">
                This would be a form to {editingCourse ? 'edit the existing' : 'add a new'} course.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsAddCourseModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setIsAddCourseModalOpen(false)}
                >
                  {editingCourse ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement; 