import React from "react";

const LessonSidebar = ({ lecture, activeLesson, isDark, onLessonClick }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Danh sách bài học</h2>
      <div className="space-y-4 max-h-[calc(100vh-260px)] overflow-y-auto pr-2">

            <ul className="space-y-2">
              {lecture?.lessons?.map(lesson => (
                <li key={lesson.id}>
                  <button
                    onClick={() => onLessonClick(lesson)}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between ${
                      activeLesson?.id === lesson.id
                        ? isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800"
                        : isDark
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="material-icons mr-2 text-lg">
                        {lesson.type === "video" ? "play_circle" : "description"}
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
              ))}
            </ul>
      </div>
    </div>
  );
};

export default LessonSidebar; 