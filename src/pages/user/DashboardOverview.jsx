import React from "react";
import { useTheme } from "../../context/ThemeContext";

const DashboardOverview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Sample data - in a real app, this would come from API/backend
  const progressData = [
    { id: 1, course: "Giới Thiệu về React", progress: 75, totalLessons: 12, completed: 9 },
    { id: 2, course: "JavaScript Nâng Cao", progress: 40, totalLessons: 15, completed: 6 },
    { id: 3, course: "Nguyên Tắc Thiết Kế Web", progress: 90, totalLessons: 10, completed: 9 }
  ];

  const recentActivities = [
    { id: 1, type: "quiz", title: "Bài Kiểm Tra Cơ Bản React", date: "2 ngày trước", score: "85%" },
    { id: 2, type: "lecture", title: "JavaScript Promises", date: "3 ngày trước", duration: "45 phút" },
    { id: 3, type: "forum", title: "Đã đăng trong 'Thảo Luận React Hooks'", date: "5 ngày trước" }
  ];

  const upcomingDeadlines = [
    { id: 1, title: "Nộp Dự Án JavaScript", course: "JavaScript Nâng Cao", dueDate: "15/05/2023" },
    { id: 2, title: "Bài Kiểm Tra Cuối Cùng", course: "Nguyên Tắc Thiết Kế Web", dueDate: "20/05/2023" }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại, Học viên!</h1>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Đây là tổng quan về tiến độ học tập của bạn.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-blue-500 mr-3">school</span>
            <h2 className="text-xl font-semibold">Khóa Học Đang Học</h2>
          </div>
          <p className="text-4xl font-bold text-blue-500">3</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Hoàn thành trung bình 68%
          </p>
        </div>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-green-500 mr-3">assignment_turned_in</span>
            <h2 className="text-xl font-semibold">Bài Kiểm Tra Đã Hoàn Thành</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">8</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Điểm Trung Bình: 82%
          </p>
        </div>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-purple-500 mr-3">schedule</span>
            <h2 className="text-xl font-semibold">Thời Gian Học</h2>
          </div>
          <p className="text-4xl font-bold text-purple-500">24h</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Tháng này
          </p>
        </div>
      </div>

      {/* Course Progress */}
      <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
        <h2 className="text-xl font-semibold mb-4">Tiến Độ Khóa Học Của Bạn</h2>
        <div className="space-y-6">
          {progressData.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{course.course}</h3>
                <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {course.completed}/{course.totalLessons} bài học
                </span>
              </div>
              <div className={`h-2 w-full bg-gray-200 ${isDark && "bg-gray-700"} rounded-full overflow-hidden`}>
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-end">
                <span className="text-sm font-medium text-blue-500">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <h2 className="text-xl font-semibold mb-4">Hoạt Động Gần Đây</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <span className={`material-icons p-2 rounded-full mr-3 ${
                  activity.type === 'quiz' 
                    ? 'bg-green-100 text-green-600' 
                    : activity.type === 'lecture' 
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'quiz' 
                    ? 'quiz' 
                    : activity.type === 'lecture' 
                      ? 'play_circle'
                      : 'forum'
                  }
                </span>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <div className="flex mt-1 text-sm">
                    <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>{activity.date}</p>
                    {activity.score && (
                      <p className="ml-4 text-green-500">Điểm: {activity.score}</p>
                    )}
                    {activity.duration && (
                      <p className="ml-4 text-blue-500">Thời lượng: {activity.duration}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <h2 className="text-xl font-semibold mb-4">Hạn Chót Sắp Tới</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className={`p-4 rounded-lg border ${
                isDark ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
              }`}>
                <h3 className="font-medium">{deadline.title}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                  {deadline.course}
                </p>
                <div className="flex items-center mt-2">
                  <span className="material-icons text-red-500 text-sm mr-1">event</span>
                  <p className="text-sm text-red-500">Hạn: {deadline.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 