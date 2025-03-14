import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import LectureList from "../../components/lectures/LectureList";
import LectureDetails from "../../components/lectures/LectureDetails";
import LessonView from "../../components/lectures/LessonView";

const LecturesAndMaterials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Sample data - in a real app, this would come from API/backend
  const lectures = [
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

  // State for UI management
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'details', 'lessons'

  // Handler functions
  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    setViewMode('details');
  };

  const handleRegister = (lectureId) => {
    // In a real app, this would call an API to register the user
    // For this demo, we'll just update the local state
    const updatedLectures = lectures.map(lecture => 
      lecture.id === lectureId ? { ...lecture, isRegistered: true } : lecture
    );
    
    // Find the updated lecture to set as selected
    const updatedLecture = updatedLectures.find(l => l.id === lectureId);
    setSelectedLecture(updatedLecture);
  };

  const handleGoToLearn = () => {
    setViewMode('lessons');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedLecture(null);
  };

  const handleBackToDetails = () => {
    setViewMode('details');
  };

  // Render the appropriate view based on the viewMode
  return (
    <div className="container mx-auto px-4 py-8">
      {viewMode === 'list' && (
        <LectureList 
          lectures={lectures} 
          isDark={isDark} 
          onLectureClick={handleLectureClick}
        />
      )}
      
      {viewMode === 'details' && (
        <LectureDetails 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToList} 
          onRegister={handleRegister} 
          onGoToLearn={handleGoToLearn}
        />
      )}
      
      {viewMode === 'lessons' && (
        <LessonView 
          lecture={selectedLecture} 
          isDark={isDark} 
          onBackClick={handleBackToDetails}
        />
      )}
    </div>
  );
};

export default LecturesAndMaterials; 