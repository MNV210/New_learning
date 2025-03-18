import React from "react";

const LessonContent = ({ lesson, isDark }) => {
  if (!lesson) return (
    <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]`}>
      <span className="material-icons text-6xl text-gray-400 mb-4">video_library</span>
      <h2 className="text-xl font-semibold mb-2">Chưa Chọn Bài Học</h2>
      <p className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Chọn một bài học từ danh sách bên phải để bắt đầu học.
      </p>
    </div>
  );
  
  return (
    <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
      <h2 className="text-2xl font-semibold mb-4">{lesson.title}</h2>
      
        <div>
          {/* Video player placeholder */}
          <div className={`aspect-video w-full ${isDark ? "bg-gray-900" : "bg-gray-200"} rounded-lg flex items-center justify-center mb-4`}>
          <embed
                  src={lesson.file_url}
                  className="w-full h-full"
                  type={
                    lesson.file_url?.endsWith('.pdf') 
                      ? 'application/pdf'
                      : 'text/plain'
                  } />
          </div>
          <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4 mt-4`}>
            <h3 className="font-medium text-lg mb-2">Mô Tả</h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {lesson.content}
            </p>
          </div>
        </div>
    </div>
  );
};

export default LessonContent; 