import React from "react";
import { useTheme } from "../../context/ThemeContext";

const DashboardOverview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Sample data - in a real app, this would come from API/backend
  const progressData = [
    { id: 1, course: "Introduction to React", progress: 75, totalLessons: 12, completed: 9 },
    { id: 2, course: "Advanced JavaScript", progress: 40, totalLessons: 15, completed: 6 },
    { id: 3, course: "Web Design Fundamentals", progress: 90, totalLessons: 10, completed: 9 }
  ];

  const recentActivities = [
    { id: 1, type: "quiz", title: "React Fundamentals Quiz", date: "2 days ago", score: "85%" },
    { id: 2, type: "lecture", title: "JavaScript Promises", date: "3 days ago", duration: "45 min" },
    { id: 3, type: "forum", title: "Posted in 'React Hooks Discussion'", date: "5 days ago" }
  ];

  const upcomingDeadlines = [
    { id: 1, title: "JavaScript Project Submission", course: "Advanced JavaScript", dueDate: "May 15, 2023" },
    { id: 2, title: "Final Quiz", course: "Web Design Fundamentals", dueDate: "May 20, 2023" }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Here's an overview of your learning progress.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-blue-500 mr-3">school</span>
            <h2 className="text-xl font-semibold">Courses In Progress</h2>
          </div>
          <p className="text-4xl font-bold text-blue-500">3</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            68% average completion
          </p>
        </div>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-green-500 mr-3">assignment_turned_in</span>
            <h2 className="text-xl font-semibold">Quizzes Completed</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">8</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Average Score: 82%
          </p>
        </div>

        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-purple-500 mr-3">schedule</span>
            <h2 className="text-xl font-semibold">Learning Time</h2>
          </div>
          <p className="text-4xl font-bold text-purple-500">24h</p>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            This month
          </p>
        </div>
      </div>

      {/* Course Progress */}
      <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
        <h2 className="text-xl font-semibold mb-4">Your Course Progress</h2>
        <div className="space-y-6">
          {progressData.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{course.course}</h3>
                <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {course.completed}/{course.totalLessons} lessons
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
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
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
                      <p className="ml-4 text-green-500">Score: {activity.score}</p>
                    )}
                    {activity.duration && (
                      <p className="ml-4 text-blue-500">Duration: {activity.duration}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
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
                  <p className="text-sm text-red-500">Due: {deadline.dueDate}</p>
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