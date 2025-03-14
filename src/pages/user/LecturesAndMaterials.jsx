import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const LecturesAndMaterials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Sample data - in a real app, this would come from API/backend
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      modules: [
        {
          id: "m1",
          title: "Getting Started with React",
          lessons: [
            { id: "l1-1", title: "What is React?", type: "video", duration: "10:25", watched: true },
            { id: "l1-2", title: "Setting Up Your Environment", type: "video", duration: "15:40", watched: true },
            { id: "l1-3", title: "React Basics PDF", type: "pdf", size: "2.4 MB", downloaded: true }
          ]
        },
        {
          id: "m2",
          title: "React Components",
          lessons: [
            { id: "l2-1", title: "Functional Components", type: "video", duration: "12:10", watched: true },
            { id: "l2-2", title: "Class Components", type: "video", duration: "14:30", watched: false },
            { id: "l2-3", title: "Component Lifecycle", type: "video", duration: "18:15", watched: false },
            { id: "l2-4", title: "Components Cheat Sheet", type: "pdf", size: "1.8 MB", downloaded: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      modules: [
        {
          id: "m3",
          title: "JavaScript ES6 Features",
          lessons: [
            { id: "l3-1", title: "Arrow Functions", type: "video", duration: "8:45", watched: true },
            { id: "l3-2", title: "Destructuring", type: "video", duration: "11:20", watched: false },
            { id: "l3-3", title: "ES6 Reference Guide", type: "pdf", size: "3.2 MB", downloaded: true }
          ]
        }
      ]
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [activeLesson, setActiveLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Lectures & Learning Materials</h1>
        <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Access video lectures and downloadable materials for your courses.
        </p>
      </div>

      {/* Course selector */}
      <div className="mb-8">
        <label className={`block mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Select Course:</label>
        <select 
          className={`w-full md:w-1/2 p-3 rounded-lg border ${
            isDark 
              ? "bg-gray-800 border-gray-700 text-white" 
              : "bg-white border-gray-300 text-gray-900"
          }`}
          value={selectedCourse.id}
          onChange={(e) => setSelectedCourse(courses.find(c => c.id === parseInt(e.target.value)))}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar with course content */}
        <div className="lg:col-span-1">
          <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-4`}>
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            
            <div className="space-y-4">
              {selectedCourse.modules.map(module => (
                <div key={module.id}>
                  <h3 className="font-medium text-lg mb-2">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.lessons.map(lesson => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full text-left p-3 rounded-lg flex items-center justify-between ${
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
                            <span className="material-icons mr-2 text-xl">
                              {lesson.type === "video" ? "play_circle" : "description"}
                            </span>
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                          <div className="flex items-center">
                            {lesson.type === "video" ? (
                              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                {lesson.duration}
                              </span>
                            ) : (
                              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
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
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          {activeLesson ? (
            <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
              <h2 className="text-2xl font-semibold mb-4">{activeLesson.title}</h2>
              
              {activeLesson.type === "video" ? (
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
                    <h3 className="font-medium text-lg mb-2">Description</h3>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      This video explains the core concepts of {activeLesson.title}. Watch closely to understand the key principles and best practices.
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
                    <h3 className="text-center text-lg font-medium mb-2">{activeLesson.title}</h3>
                    <p className="text-center text-sm text-gray-500 mb-4">Size: {activeLesson.size}</p>
                    <div className="flex justify-center">
                      <button className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700`}>
                        <span className="material-icons mr-2">file_download</span>
                        Download PDF
                      </button>
                    </div>
                  </div>
                  
                  <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4 mt-4`}>
                    <h3 className="font-medium text-lg mb-2">Document Information</h3>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      This document contains essential reference material related to {activeLesson.title}. 
                      Download it for offline study and reference.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px]`}>
              <span className="material-icons text-6xl text-gray-400 mb-4">video_library</span>
              <h2 className="text-xl font-semibold mb-2">No Lesson Selected</h2>
              <p className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Select a lesson from the course content to start learning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturesAndMaterials; 