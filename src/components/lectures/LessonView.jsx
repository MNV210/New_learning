import React, { useEffect, useState } from "react";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import ChatTab from "./ChatTab";
import { courseService, lectureService } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import LoadingSkeleton from "../LoadingSkeleton";

const LessonView = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("lessons"); // "lessons" or "chat"
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [loading,setLoading] = useState(false)

  const [lecture, setLecture] = useState([])
  const params= useParams()
  const navigate = useNavigate()

  const getDetailCourse = async () => {
      try {
        setLoading(true)
        const courseDetails = await courseService.getCourseById(params.course_id);
        setLecture(courseDetails.data);  
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to load course details.');
      } finally {
        setLoading(false)
      }
  };

  const getInfomationLesson = async () => {
    try {
      const response = await lectureService.getLectureById(
        params.lesson_id,
      );
      setActiveLesson(response.data)
    } catch (error) {
      console.error('Error fetching lesson information:', error);
      toast.error('Failed to load lesson information.');
    }
  };

  useEffect(()=> {
    getInfomationLesson()
  },[params.lesson_id])

  useEffect(()=> {
    getDetailCourse()
  },[params.course])

  const handleLessonClick = (lesson) => {
    navigate(`/user/learn/${params.course_id}/lesson/${lesson.id}`)
  };

  const onBackClick = () => {
    navigate(`/user/lecture/${params.course_id}`)
  }

  if(loading) {
    return <LoadingSkeleton/>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBackClick}
          className={`flex items-center ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
        >
          <span className="material-icons mr-1">arrow_back</span>
          Quay lại thông tin khóa học
        </button>
        
        <h1 className="text-2xl font-bold">{lecture.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area - always visible on the left */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <LessonContent lesson={activeLesson} isDark={isDark} />
        </div>

        {/* Right sidebar with tabs */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === "lessons"
                      ? isDark
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-blue-600 border-b-2 border-blue-600"
                      : isDark 
                        ? "text-gray-400 hover:text-gray-300" 
                        : "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab("lessons")}
                >
                  <div className="flex items-center">
                    <span className="material-icons mr-2">menu_book</span>
                    Bài học
                  </div>
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === "chat"
                      ? isDark
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-blue-600 border-b-2 border-blue-600"
                      : isDark 
                        ? "text-gray-400 hover:text-gray-300" 
                        : "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  <div className="flex items-center">
                    <span className="material-icons mr-2">chat</span>
                    Trò chuyện
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Tab content */}
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
            {activeTab === "lessons" ? (
              <LessonSidebar 
                lecture={lecture} 
                activeLesson={activeLesson} 
                isDark={isDark} 
                onLessonClick={handleLessonClick} 
              />
            ) : (
              <ChatTab isDark={isDark} lecture={lecture} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;