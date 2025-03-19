import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import learnProgressService from "../../services/learnProgressService";

const LessonSidebar = ({ lecture, activeLesson, isDark, onLessonClick }) => {
  const params = useParams();
  const [progressData, setProgressData] = useState([]);

  const getProgressLearn = async () => {
    try {
      const progressCheck = await learnProgressService.getByUserAndLession({
        course_id: params.course_id,
      });
      setProgressData(progressCheck.data || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
      setProgressData([]);
    }
  };

  useEffect(() => {
    getProgressLearn();
  }, []);

  // Kiểm tra xem bài học có trong progressCheck hay không
  const isLessonUnlocked = (lessonId) => {
    // Nếu không có dữ liệu progressCheck, mở bài học đầu tiên
    if (!progressData || progressData.length === 0) {
      return lecture?.lessons?.[0]?.id === lessonId;
    }
    
    // Lấy danh sách các bài học đã hoàn thành
    const completedLessons = progressData.filter(progress => progress.status === 'completed');
    
    // Tìm vị trí của bài học hiện tại trong danh sách
    const currentLessonIndex = lecture?.lessons?.findIndex(lesson => lesson.id === lessonId);
    
    // Nếu là bài học đầu tiên hoặc bài học đã hoàn thành, cho phép mở
    if (currentLessonIndex === 0 || completedLessons.some(progress => progress.lesson_id === lessonId)) {
      return true;
    }
    
    // Kiểm tra xem bài học trước đó đã hoàn thành chưa
    const previousLesson = lecture?.lessons?.[currentLessonIndex - 1];
    return completedLessons.some(progress => progress.lesson_id === previousLesson?.id);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Danh sách bài học</h2>
      <div className="space-y-4 max-h-[calc(100vh-260px)] overflow-y-auto pr-2">
            <ul className="space-y-2">
              {lecture?.lessons?.map(lesson => {
                const unlocked = isLessonUnlocked(lesson.id);
                
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => unlocked && onLessonClick(lesson)}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between ${
                        activeLesson?.id === lesson.id
                          ? isDark
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                          : isDark
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-100"
                      } ${!unlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={!unlocked}
                    >
                      <div className="flex items-center">
                        <span className="material-icons mr-2 text-lg">
                          {!unlocked ? "lock" : lesson.type === "video" ? "play_circle" : "description"}
                        </span>
                        <span className="font-medium text-sm">{lesson.title}</span>
                      </div>
                      <div className="flex items-center">
                        {lesson.type === "video" ? (
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {lesson.duration}
                          </span>
                        ) : (
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {lesson.size}
                          </span>
                        )}
                        {(lesson.watched || lesson.downloaded) && (
                          <span className="material-icons ml-2 text-green-500 text-sm">
                            check_circle
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
      </div>
    </div>
  );
};

export default LessonSidebar; 