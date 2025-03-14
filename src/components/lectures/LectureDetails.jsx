import React from "react";

const LectureDetails = ({ lecture, isDark, onBackClick, onRegister, onGoToLearn }) => {
  if (!lecture) return null;
  
  return (
    <div>
      <button 
        onClick={onBackClick}
        className={`mb-4 flex items-center ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
      >
        <span className="material-icons mr-1">arrow_back</span>
        Quay lại danh sách bài giảng
      </button>
      
      <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md overflow-hidden`}>
        <div className="h-64 bg-gray-300 relative">
          <img 
            src={lecture.thumbnail} 
            alt={lecture.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lecture.title}</h1>
              <div className="flex flex-wrap text-sm mb-4">
                <span className={`mr-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">person</span>
                  Giảng viên: {lecture.instructor}
                </span>
                <span className={`mr-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">schedule</span>
                  Thời lượng: {lecture.duration}
                </span>
                <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">signal_cellular_alt</span>
                  Cấp độ: {lecture.level}
                </span>
              </div>
            </div>
            
            {lecture.isRegistered ? (
              <button 
                onClick={onGoToLearn} 
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:bg-green-700 transition-colors mt-4 md:mt-0"
              >
                <span className="material-icons mr-2">play_circle</span>
                Bắt đầu học
              </button>
            ) : (
              <button 
                onClick={() => onRegister(lecture.id)} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors mt-4 md:mt-0"
              >
                <span className="material-icons mr-2">how_to_reg</span>
                Đăng ký khóa học
              </button>
            )}
          </div>
          
          <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-5 mb-6`}>
            <h2 className="text-xl font-semibold mb-3">Mô tả khóa học</h2>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {lecture.description}
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Nội dung khóa học</h2>
            <div className="space-y-4">
              {lecture.modules.map((module, index) => (
                <div key={module.id} className={`${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-4`}>
                  <h3 className="font-medium text-lg mb-2">
                    Phần {index + 1}: {module.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}>
                    {module.lessons.length} bài học
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetails; 