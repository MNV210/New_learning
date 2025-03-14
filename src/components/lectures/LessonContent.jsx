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
      
      {lesson.type === "video" ? (
        <div>
          {/* Video player placeholder */}
          <div className={`aspect-video w-full ${isDark ? "bg-gray-900" : "bg-gray-200"} rounded-lg flex items-center justify-center mb-4`}>
            <span className="material-icons text-6xl text-gray-500">play_circle</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <span className="material-icons text-2xl">play_arrow</span>
              </button>
              <button className={`p-2 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <span className="material-icons text-2xl">pause</span>
              </button>
              <button className={`p-2 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <span className="material-icons text-2xl">replay_10</span>
              </button>
              <button className={`p-2 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <span className="material-icons text-2xl">forward_10</span>
              </button>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2">volume_up</span>
              <div className="w-24 h-2 bg-gray-300 rounded-full">
                <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4 mt-4`}>
            <h3 className="font-medium text-lg mb-2">Mô Tả</h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Video này giải thích các khái niệm cốt lõi của {lesson.title}. Hãy xem kỹ để hiểu các nguyên tắc chính và thực hành tốt nhất.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* PDF document preview */}
          <div className={`border-2 ${isDark ? "border-gray-700" : "border-gray-300"} rounded-lg p-6 mb-6`}>
            <div className="flex justify-center mb-6">
              <span className="material-icons text-red-500 text-6xl">picture_as_pdf</span>
            </div>
            <h3 className="text-center text-lg font-medium mb-2">{lesson.title}</h3>
            <p className="text-center text-sm text-gray-500 mb-4">Kích thước: {lesson.size}</p>
            <div className="flex justify-center">
              <button className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700`}>
                <span className="material-icons mr-2">file_download</span>
                Tải Xuống PDF
              </button>
            </div>
          </div>
          
          <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4 mt-4`}>
            <h3 className="font-medium text-lg mb-2">Thông Tin Tài Liệu</h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Tài liệu này chứa tài liệu tham khảo thiết yếu liên quan đến {lesson.title}. 
              Tải xuống để nghiên cứu và tham khảo ngoại tuyến.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonContent; 