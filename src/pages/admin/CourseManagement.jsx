import { useState } from 'react';
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
    image: 'https://via.placeholder.com/150?text=JS',
    description: 'Learn the fundamentals of JavaScript programming language.',
    modules: [
      {
        id: 1,
        title: 'JavaScript Basics',
        materials: [
          { id: 1, type: 'video', title: 'Introduction to JavaScript', file: 'js_intro.mp4' },
          { id: 2, type: 'pdf', title: 'JavaScript Syntax Guide', file: 'js_syntax.pdf' }
        ]
      },
      {
        id: 2,
        title: 'DOM Manipulation',
        materials: [
          { id: 3, type: 'video', title: 'Working with the DOM', file: 'dom_intro.mp4' },
          { id: 4, type: 'pdf', title: 'DOM Methods Cheatsheet', file: 'dom_cheatsheet.pdf' }
        ]
      }
    ]
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

// Predefined categories
const predefinedCategories = [
  'Programming',
  'Web Development',
  'Data Science',
  'Design',
  'Mobile Development',
  'DevOps',
  'Artificial Intelligence',
  'Blockchain',
  'Cloud Computing',
  'Other'
];

function CourseManagement() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Form state for the modal
  const [formData, setFormData] = useState({
    title: '',
    category: 'Programming',
    instructor: '',
    description: '',
    status: 'Draft',
    image: '',
    modules: []
  });
  
  // Active tab in modal
  const [activeTab, setActiveTab] = useState('details');
  
  // For module editing
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [moduleFormData, setModuleFormData] = useState({ title: '', materials: [] });
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [materialFormData, setMaterialFormData] = useState({ type: 'video', title: '', file: null });

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
    setFormData({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      description: course.description || '',
      status: course.status,
      image: course.image,
      modules: course.modules || []
    });
    setActiveTab('details');
    setIsAddCourseModalOpen(true);
  };
  
  // Handle adding a new course - reset form data
  const handleAddCourse = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      category: 'Programming',
      instructor: '',
      description: '',
      status: 'Draft',
      image: '',
      modules: []
    });
    setActiveTab('details');
    setIsAddCourseModalOpen(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server and get a URL
      // For demo purposes, we'll just use a placeholder
      setFormData(prev => ({ 
        ...prev, 
        image: URL.createObjectURL(file) 
      }));
    }
  };
  
  // Add or edit a module
  const handleAddEditModule = (moduleIndex = null) => {
    if (moduleIndex !== null) {
      // Edit existing module
      setCurrentModuleIndex(moduleIndex);
      setModuleFormData({
        title: formData.modules[moduleIndex].title,
        materials: formData.modules[moduleIndex].materials
      });
    } else {
      // Add new module
      setCurrentModuleIndex(null);
      setModuleFormData({ title: '', materials: [] });
    }
  };
  
  // Save module
  const handleSaveModule = () => {
    if (moduleFormData.title.trim() === '') return;
    
    const updatedModules = [...formData.modules];
    
    if (currentModuleIndex !== null) {
      // Update existing module
      updatedModules[currentModuleIndex] = {
        ...updatedModules[currentModuleIndex],
        title: moduleFormData.title,
        materials: moduleFormData.materials
      };
    } else {
      // Add new module
      updatedModules.push({
        id: Date.now(), // Simple way to generate unique ID
        title: moduleFormData.title,
        materials: moduleFormData.materials
      });
    }
    
    setFormData(prev => ({ ...prev, modules: updatedModules }));
    setCurrentModuleIndex(null);
    setModuleFormData({ title: '', materials: [] });
  };
  
  // Delete module
  const handleDeleteModule = (moduleIndex) => {
    const updatedModules = formData.modules.filter((_, index) => index !== moduleIndex);
    setFormData(prev => ({ ...prev, modules: updatedModules }));
  };
  
  // Add material to module
  const handleAddMaterial = () => {
    setIsAddingMaterial(true);
    setMaterialFormData({ type: 'video', title: '', file: null });
  };
  
  // Handle material form changes
  const handleMaterialInputChange = (e) => {
    const { name, value } = e.target;
    setMaterialFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle material file upload
  const handleMaterialFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      setMaterialFormData(prev => ({ 
        ...prev, 
        file: file.name 
      }));
    }
  };
  
  // Save material to module
  const handleSaveMaterial = () => {
    if (materialFormData.title.trim() === '' || !materialFormData.file) return;
    
    const newMaterial = {
      id: Date.now(), // Simple way to generate unique ID
      type: materialFormData.type,
      title: materialFormData.title,
      file: materialFormData.file
    };
    
    setModuleFormData(prev => ({
      ...prev,
      materials: [...prev.materials, newMaterial]
    }));
    
    setIsAddingMaterial(false);
    setMaterialFormData({ type: 'video', title: '', file: null });
  };
  
  // Delete material from module
  const handleDeleteMaterial = (materialIndex) => {
    const updatedMaterials = moduleFormData.materials.filter((_, index) => index !== materialIndex);
    setModuleFormData(prev => ({ ...prev, materials: updatedMaterials }));
  };
  
  // Save course (create new or update existing)
  const handleSaveCourse = () => {
    if (formData.title.trim() === '' || formData.instructor.trim() === '') {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingCourse) {
      // Update existing course
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === editingCourse.id 
            ? { ...course, ...formData, lastUpdated: new Date().toISOString().split('T')[0] } 
            : course
        )
      );
    } else {
      // Add new course
      const newCourse = {
        id: Date.now(), // Simple way to generate unique ID
        ...formData,
        enrolled: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCourses(prevCourses => [...prevCourses, newCourse]);
    }
    
    setIsAddCourseModalOpen(false);
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
            onClick={handleAddCourse}
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
      
      {/* Modal for adding/editing courses */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsAddCourseModalOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('details')}
              >
                Course Details
              </button>
              <button
                className={`px-6 py-3 ${activeTab === 'modules' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('modules')}
                disabled={!editingCourse && !formData.title}
              >
                Modules & Materials
              </button>
            </div>
            
            {/* Modal body - scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'details' ? (
                /* Course Details Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Course Title*</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter course title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">Instructor*</label>
                      <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter instructor name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {predefinedCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter course description"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                        {formData.image ? (
                          <img src={formData.image} alt="Course preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <DocumentIcon className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="imageUpload" className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">
                          <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 16:9 ratio, max 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Modules & Materials Form */
                <div>
                  {/* Modules List */}
                  {currentModuleIndex === null ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Course Modules</h3>
                        <button
                          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => handleAddEditModule()}
                        >
                          <PlusIcon className="w-5 h-5 mr-1" />
                          Add Module
                        </button>
                      </div>
                      
                      <ul className="space-y-3">
                        {formData.modules.length > 0 ? (
                          formData.modules.map((module, index) => (
                            <li key={module.id} className="border border-gray-200 rounded-md p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{module.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    {module.materials ? module.materials.length : 0} materials
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                    onClick={() => handleAddEditModule(index)}
                                  >
                                    <PencilIcon className="w-5 h-5" />
                                  </button>
                                  <button
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                    onClick={() => handleDeleteModule(index)}
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-md">
                            No modules added yet. Add your first module.
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : (
                    /* Module Edit Form */
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          {currentModuleIndex !== null ? 'Edit Module' : 'Add New Module'}
                        </h3>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setCurrentModuleIndex(null);
                            setModuleFormData({ title: '', materials: [] });
                          }}
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">Module Title*</label>
                          <input
                            type="text"
                            id="moduleTitle"
                            value={moduleFormData.title}
                            onChange={(e) => setModuleFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter module title"
                            required
                          />
                        </div>
                        
                        {/* Materials List */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Module Materials</h4>
                            <button
                              className="flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                              onClick={handleAddMaterial}
                            >
                              <PlusIcon className="w-4 h-4 mr-1" />
                              Add Material
                            </button>
                          </div>
                          
                          {isAddingMaterial ? (
                            /* Material Add Form */
                            <div className="border border-gray-200 rounded-md p-4 mb-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label htmlFor="materialType" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                  <select
                                    id="materialType"
                                    name="type"
                                    value={materialFormData.type}
                                    onChange={handleMaterialInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="video">Video</option>
                                    <option value="pdf">PDF Document</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label htmlFor="materialTitle" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                  <input
                                    type="text"
                                    id="materialTitle"
                                    name="title"
                                    value={materialFormData.title}
                                    onChange={handleMaterialInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter material title"
                                  />
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File*</label>
                                <label
                                  htmlFor="materialFile"
                                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer w-full"
                                >
                                  <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                                  {materialFormData.file ? materialFormData.file : "Select file"}
                                </label>
                                <input
                                  type="file"
                                  id="materialFile"
                                  accept={materialFormData.type === 'video' ? "video/*" : "application/pdf"}
                                  className="hidden"
                                  onChange={handleMaterialFileUpload}
                                />
                              </div>
                              
                              <div className="flex justify-end space-x-3">
                                <button
                                  className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                  onClick={() => setIsAddingMaterial(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                  onClick={handleSaveMaterial}
                                >
                                  Add Material
                                </button>
                              </div>
                            </div>
                          ) : null}
                          
                          <ul className="space-y-2">
                            {moduleFormData.materials.length > 0 ? (
                              moduleFormData.materials.map((material, index) => (
                                <li key={material.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                  <div className="flex items-center">
                                    {material.type === 'video' ? (
                                      <VideoCameraIcon className="w-5 h-5 text-blue-500 mr-2" />
                                    ) : (
                                      <DocumentTextIcon className="w-5 h-5 text-red-500 mr-2" />
                                    )}
                                    <span>{material.title}</span>
                                  </div>
                                  <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDeleteMaterial(index)}
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-md">
                                No materials added yet
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setCurrentModuleIndex(null);
                              setModuleFormData({ title: '', materials: [] });
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleSaveModule}
                          >
                            Save Module
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Modal footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setIsAddCourseModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSaveCourse}
              >
                {editingCourse ? 'Save Changes' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement; 