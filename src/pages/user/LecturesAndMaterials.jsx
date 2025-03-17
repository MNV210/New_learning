import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import LectureList from "../../components/lectures/LectureList";
import LectureDetails from "../../components/lectures/LectureDetails";
import LessonView from "../../components/lectures/LessonView";
import { courseService, lectureService } from "../../services";
import { toast } from 'react-toastify';

const LecturesAndMaterials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // States for lectures and UI
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  // Sample data - sẽ được sử dụng khi API không hoạt động
  const sampleLectures = [
    {
      id: 1,
      title: "Giới Thiệu về React",
      instructor: "Nguyễn Văn A",
      duration: "8 tuần",
      level: "Cơ bản",
      description: "Khóa học này sẽ giới thiệu cho bạn những kiến thức cơ bản về React, một thư viện JavaScript phổ biến để xây dựng giao diện người dùng.",
      thumbnail: "https://via.placeholder.com/300x200?text=React",
      isRegistered: true,
      modules: [
        {
          id: "m1",
          title: "Bắt Đầu với React",
          lessons: [
            { id: "l1-1", title: "React là gì?", type: "video", duration: "10:25", watched: true },
            { id: "l1-2", title: "Thiết Lập Môi Trường", type: "video", duration: "15:40", watched: true },
            { id: "l1-3", title: "Tài Liệu Cơ Bản về React", type: "pdf", size: "2.4 MB", downloaded: true }
          ]
        },
        {
          id: "m2",
          title: "Các Component Trong React",
          lessons: [
            { id: "l2-1", title: "Component Chức Năng", type: "video", duration: "12:10", watched: true },
            { id: "l2-2", title: "Component Lớp", type: "video", duration: "14:30", watched: false },
            { id: "l2-3", title: "Vòng Đời Component", type: "video", duration: "18:15", watched: false },
            { id: "l2-4", title: "Tài Liệu Tóm Tắt về Component", type: "pdf", size: "1.8 MB", downloaded: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript Nâng Cao",
      instructor: "Trần Thị B",
      duration: "6 tuần",
      level: "Trung bình",
      description: "Khám phá các tính năng nâng cao của JavaScript hiện đại, bao gồm Promises, async/await, và các API ES6+ mới nhất.",
      thumbnail: "https://via.placeholder.com/300x200?text=JavaScript",
      isRegistered: false,
      modules: [
        {
          id: "m3",
          title: "Tính Năng JavaScript ES6",
          lessons: [
            { id: "l3-1", title: "Hàm Mũi Tên", type: "video", duration: "8:45", watched: false },
            { id: "l3-2", title: "Phân Rã", type: "video", duration: "11:20", watched: false },
            { id: "l3-3", title: "Tài Liệu Tham Khảo ES6", type: "pdf", size: "3.2 MB", downloaded: false }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Python cho Phân tích Dữ liệu",
      instructor: "Lê Văn C",
      duration: "10 tuần",
      level: "Nâng cao",
      description: "Học cách sử dụng Python, pandas, và các thư viện khác để xử lý, phân tích và trực quan hóa dữ liệu.",
      thumbnail: "https://via.placeholder.com/300x200?text=Python",
      isRegistered: true,
      modules: [
        {
          id: "m4",
          title: "Cơ bản về Python",
          lessons: [
            { id: "l4-1", title: "Giới thiệu về Python", type: "video", duration: "12:45", watched: true },
            { id: "l4-2", title: "Cấu trúc dữ liệu trong Python", type: "video", duration: "15:20", watched: false }
          ]
        }
      ]
    }
  ];

  // Fetch dữ liệu khóa học từ API khi component được mount
  useEffect(() => {
    fetchLectures();
  }, []);

  // Hàm để lấy danh sách khóa học từ API
  const fetchLectures = async () => {
    try {
      setLoading(true);
      const coursesData = await courseService.getAllCourses();
      setLectures(coursesData);
      setError(null);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again later.');
      // Sử dụng dữ liệu mẫu khi API gặp lỗi
      setLectures(sampleLectures);
      toast.error('Error loading courses. Using sample data instead.');
    } finally {
      setLoading(false);
    }
  };

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
  const fetchLectureMaterials = async (courseId, lectureId) => {
    try {
      setLoading(true);
      const materials = await lectureService.getLectureMaterials(courseId, lectureId);
      // Cập nhật lesson với materials
      setSelectedLesson({ ...selectedLesson, materials });
      setError(null);
    } catch (error) {
      console.error('Error fetching lecture materials:', error);
      toast.error('Failed to load lecture materials.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm để đánh dấu bài giảng đã hoàn thành
  const markLectureAsCompleted = async (courseId, lectureId) => {
    try {
      await lectureService.markLectureAsCompleted(courseId, lectureId);
      toast.success('Lesson marked as completed');
      
      // Cập nhật trạng thái local
      if (selectedLecture) {
        const updatedModules = selectedLecture.modules.map(module => {
          const updatedLessons = module.lessons.map(lesson => 
            lesson.id === lectureId ? { ...lesson, watched: true } : lesson
          );
          return { ...module, lessons: updatedLessons };
        });
        
        setSelectedLecture({ ...selectedLecture, modules: updatedModules });
      }
    } catch (error) {
      console.error('Error marking lecture as completed:', error);
      toast.error('Failed to mark lesson as completed');
    }
  };

  // Hàm để đăng ký khóa học
  const handleRegister = async (lectureId) => {
    try {
      await courseService.enrollCourse(lectureId, {});
      toast.success('Successfully enrolled in the course');
      
      // Cập nhật trạng thái local
      setLectures(lectures.map(lecture => 
        lecture.id === lectureId ? { ...lecture, isRegistered: true } : lecture
      ));
      
      if (selectedLecture && selectedLecture.id === lectureId) {
        setSelectedLecture({ ...selectedLecture, isRegistered: true });
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in the course');
    }
  };

  const handleLectureClick = (lecture) => {
    fetchLectureDetails(lecture.id);
    setCurrentView("details");
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

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    // Nếu đã chọn một bài giảng, lấy tài liệu của nó
    if (selectedLecture && lesson) {
      fetchLectureMaterials(selectedLecture.id, lesson.id);
    }
    setCurrentView("learn");
  };

  // Render loading state
  if (loading && lectures.length === 0) {
    return (
      <div className={`p-6 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-6">Bài Giảng & Tài Liệu</h1>
        <div className="flex justify-center items-center h-64">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Đang tải bài giảng...</p>
        </div>
      </div>
    );
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
              onClick={fetchLectures}
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
      
      {currentView === 'details' && (
        <LectureDetails 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToList} 
          onRegister={handleRegister} 
          onGoToLearn={handleGoToLearn}
        />
      )}
      
      {currentView === 'learn' && (
        <LessonView 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToDetails}
          onLessonClick={handleLessonClick}
        />
      )}
    </div>
  );
};

export default LecturesAndMaterials; 