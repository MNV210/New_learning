import React from "react";

const LectureList = ({ lectures, isDark, onLectureClick }) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Bài Giảng & Tài Liệu Học Tập</h1>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Khám phá các bài giảng có sẵn và đăng ký để bắt đầu học tập.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures?.map(lecture => (
          <div 
            key={lecture.id} 
            className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            onClick={() => onLectureClick(lecture)}
          >
            <div className="h-40 bg-gray-300 relative overflow-hidden">
              <img 
                src={lecture.thumbnail} 
                alt={lecture.title} 
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                lecture.isRegistered 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-200 text-gray-800"
              }`}>
                {lecture.isRegistered ? "Đã đăng ký" : "Chưa đăng ký"}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{lecture.title}</h3>
              <div className="flex flex-wrap text-sm mb-2">
                <span className={`mr-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">person</span>
                  {lecture.instructor}
                </span>
                <span className={`mr-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">schedule</span>
                  {lecture.duration}
                </span>
                <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="material-icons text-sm align-text-bottom mr-1">signal_cellular_alt</span>
                  {lecture.level}
                </span>
              </div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} line-clamp-2`}>
                {lecture.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureList; 