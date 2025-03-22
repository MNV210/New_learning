import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import LectureList from "../../components/lectures/LectureList";
import LectureDetails from "../../components/lectures/LectureDetails";
import LessonView from "../../components/lectures/LessonView";
import { courseService, lectureService, categoryService } from "../../services";
import { toast } from 'react-toastify';
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useNavigate } from "react-router-dom";

const LecturesAndMaterials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate()
  
  // States for lectures and UI
  const [lectures, setLectures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [selectedLesson, setSelectedLesson] = useState(null);
  

  // Fetch dữ liệu khóa học và danh mục từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories first
        const categoriesData = await categoryService.getAllCategories();
        const categories = categoriesData.data || categoriesData.categories || [];
        setCategories(categories);
        
        // Then fetch courses
        const coursesData = await courseService.getAllCourses();
        const courses = coursesData.data || coursesData.courses || [];
        
        // Enrich courses with category names
        const enrichedCourses = courses.map(course => {
          const category = categories.find(cat => cat.id === course.categoryId);
          return {
            ...course,
            categoryName: category ? category.name : 'Không có danh mục'
          };
        });
        
        setLectures(enrichedCourses);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load courses. Please try again later.');
        toast.error('Error loading courses. Using sample data instead.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Hàm để lấy chi tiết bài giảng từ API
  const fetchLectureDetails = async (courseId) => {
    try {
      setLoading(true);
      const courseDetails = await courseService.getCourseById(courseId);
      setSelectedLecture(courseDetails);
      setError(null);
    } catch (error) {
      console.error('Error fetching lecture details:', error);
      toast.error('Failed to load lecture details.');
      // Sử dụng dữ liệu mẫu khi API gặp lỗi
      const sampleLecture = sampleLectures.find(lecture => lecture.id === courseId);
      setSelectedLecture(sampleLecture || null);
    } finally {
      setLoading(false);
    }
  };

  // Hàm để lấy tài liệu bài giảng từ API
  // const fetchLectureMaterials = async (courseId, lectureId) => {
  //   try {
  //     setLoading(true);
  //     const materials = await lectureService.getLectureMaterials(courseId, lectureId);
  //     // Cập nhật lesson với materials
  //     setSelectedLesson({ ...selectedLesson, materials });
  //     setError(null);
  //   } catch (error) {
  //     console.error('Error fetching lecture materials:', error);
  //     toast.error('Failed to load lecture materials.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Hàm để đánh dấu bài giảng đã hoàn thành
  // const markLectureAsCompleted = async (courseId, lectureId) => {
  //   try {
  //     await lectureService.markLectureAsCompleted(courseId, lectureId);
  //     toast.success('Lesson marked as completed');
      
  //     // Cập nhật trạng thái local
  //     if (selectedLecture) {
  //       const updatedModules = selectedLecture.modules.map(module => {
  //         const updatedLessons = module.lessons.map(lesson => 
  //           lesson.id === lectureId ? { ...lesson, watched: true } : lesson
  //         );
  //         return { ...module, lessons: updatedLessons };
  //       });
        
  //       setSelectedLecture({ ...selectedLecture, modules: updatedModules });
  //     }
  //   } catch (error) {
  //     console.error('Error marking lecture as completed:', error);
  //     toast.error('Failed to mark lesson as completed');
  //   }
  // };

  // Hàm để đăng ký khóa học
  // const handleRegister = async (lectureId) => {
  //   try {
  //     await courseService.enrollCourse(lectureId, {});
  //     toast.success('Successfully enrolled in the course');
      
  //     // Cập nhật trạng thái local
  //     setLectures(lectures?.map(lecture => 
  //       lecture.id === lectureId ? { ...lecture, isRegistered: true } : lecture
  //     ));
      
  //     if (selectedLecture && selectedLecture.id === lectureId) {
  //       setSelectedLecture({ ...selectedLecture, isRegistered: true });
  //     }
  //   } catch (error) {
  //     console.error('Error enrolling in course:', error);
  //     toast.error('Failed to enroll in the course');
  //   }
  // };

  const handleLectureClick = (lecture) => {
    navigate(`/user/lecture/${lecture.id}`)
    // fetchLectureDetails(lecture.id);
    // setCurrentView("details");
  };

  const handleGoToLearn = () => {
    setCurrentView("learn");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedLecture(null);
  };

  const handleBackToDetails = () => {
    setCurrentView("details");
    setSelectedLesson(null);
  };

  // const handleLessonClick = (lesson) => {
  //   setSelectedLesson(lesson);
  //   // Nếu đã chọn một bài giảng, lấy tài liệu của nó
  //   if (selectedLecture && lesson) {
  //     fetchLectureMaterials(selectedLecture.id, lesson.id);
  //   }
  //   setCurrentView("learn");
  // };

  // Render loading state
    if (loading) {
      return <LoadingSkeleton />;
    }

  // Render error state
  if (error && lectures.length === 0) {
    return (
      <div className={`p-6 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-6">Bài Giảng & Tài Liệu</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => {
                const fetchData = async () => {
                  try {
                    setLoading(true);
                    
                    // Fetch categories first
                    const categoriesData = await categoryService.getAllCategories();
                    const categories = categoriesData.data || categoriesData.categories || [];
                    setCategories(categories);
                    
                    // Then fetch courses
                    const coursesData = await courseService.getAllCourses();
                    const courses = coursesData.data || coursesData.courses || [];
                    
                    // Enrich courses with category names
                    const enrichedCourses = courses.map(course => {
                      const category = categories.find(cat => cat.id === course.categoryId);
                      return {
                        ...course,
                        categoryName: category ? category.name : 'Không có danh mục'
                      };
                    });
                    
                    setLectures(enrichedCourses);
                    setError(null);
                  } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Failed to load courses. Please try again later.');
                    toast.error('Error loading courses. Using sample data instead.');
                  } finally {
                    setLoading(false);
                  }
                };
                
                fetchData();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate view based on the currentView
  return (
    <div className="container mx-auto px-4 py-8">
      {currentView === 'list' && (
        <LectureList 
          lectures={lectures} 
          isDark={isDark} 
          onLectureClick={handleLectureClick}
        />
      )}
      
      {/* {currentView === 'details' && (
        <LectureDetails 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToList} 
          // onRegister={handleRegister} 
          onGoToLearn={handleGoToLearn}
        />
      )} */}
      
      {/* {currentView === 'learn' && (
        <LessonView 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToDetails}
          onLessonClick={handleLessonClick}
        />
      )} */}
    </div>
  );
};

export default LecturesAndMaterials; 