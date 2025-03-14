import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const QuizzesAndAssessments = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Sample data - in a real app, this would come from API/backend
  const quizzes = [
    {
      id: 1,
      title: "React Fundamentals Quiz",
      course: "Introduction to React",
      questions: 10,
      timeLimit: 20,
      status: "available",
      description: "Test your knowledge of React basics including components, props, and state management."
    },
    {
      id: 2,
      title: "JavaScript ES6 Assessment",
      course: "Advanced JavaScript",
      questions: 15,
      timeLimit: 30,
      status: "available",
      description: "Comprehensive assessment covering ES6 features like arrow functions, destructuring, and modules."
    },
    {
      id: 3,
      title: "React Hooks Challenge",
      course: "Introduction to React",
      questions: 8,
      timeLimit: 15,
      status: "completed",
      score: 85,
      completedDate: "May 10, 2023",
      description: "Test your understanding of React Hooks including useState, useEffect, useContext, and custom hooks."
    },
    {
      id: 4,
      title: "Web Design Principles",
      course: "Web Design Fundamentals",
      questions: 12,
      timeLimit: 25,
      status: "available",
      description: "Assessment covering key web design principles, color theory, typography, and layout techniques."
    }
  ];

  // Example quiz with questions
  const sampleQuiz = {
    id: 1,
    title: "React Fundamentals Quiz",
    course: "Introduction to React",
    timeLimit: 20,
    questions: [
      {
        id: 1,
        question: "What is JSX in React?",
        options: [
          "A JavaScript library for building user interfaces",
          "A syntax extension for JavaScript that looks similar to HTML",
          "A JavaScript compiler",
          "A React-specific HTTP client"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which of the following is used to pass data from parent to child components in React?",
        options: [
          "State",
          "Props",
          "Context",
          "Refs"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What hook would you use to perform side effects in a functional component?",
        options: [
          "useState",
          "useReducer",
          "useEffect",
          "useContext"
        ],
        correctAnswer: 2
      }
    ]
  };

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const startQuiz = (quiz) => {
    setActiveQuiz(sampleQuiz); // In a real app, you would fetch the quiz with questions
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
    setQuizStarted(false);
    setQuizSubmitted(false);
  };

  const beginQuiz = () => {
    setQuizStarted(true);
    // In a real app, you would start a timer to count down timeLeft
  };

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    // In a real app, you would submit the answers to the server
  };

  // Calculate score for the submitted quiz
  const calculateScore = () => {
    if (!activeQuiz) return 0;
    
    let correctCount = 0;
    activeQuiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / activeQuiz.questions.length) * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      {!activeQuiz ? (
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Quizzes & Assessments</h1>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Test your knowledge and track your progress through these assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
              <div className="space-y-4">
                {quizzes.filter(quiz => quiz.status === "available").map(quiz => (
                  <div 
                    key={quiz.id} 
                    className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{quiz.title}</h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>
                          {quiz.course}
                        </p>
                        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
                          {quiz.description}
                        </p>
                        <div className="flex items-center text-sm space-x-4">
                          <div className="flex items-center">
                            <span className="material-icons text-blue-500 mr-1 text-sm">quiz</span>
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-icons text-red-500 mr-1 text-sm">timer</span>
                            <span>{quiz.timeLimit} mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                      <button 
                        onClick={() => startQuiz(quiz)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Completed Assessments</h2>
              <div className="space-y-4">
                {quizzes.filter(quiz => quiz.status === "completed").map(quiz => (
                  <div 
                    key={quiz.id} 
                    className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-5`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{quiz.title}</h3>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>
                          {quiz.course}
                        </p>
                        <div className="flex items-center text-sm space-x-4 mb-3">
                          <div className="flex items-center">
                            <span className="material-icons text-blue-500 mr-1 text-sm">quiz</span>
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-icons text-green-500 mr-1 text-sm">check_circle</span>
                            <span>Completed {quiz.completedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex flex-col items-center p-3 rounded-full ${
                        quiz.score >= 80 
                          ? "bg-green-100 text-green-800" 
                          : quiz.score >= 60 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                      }`}>
                        <span className="text-2xl font-bold">{quiz.score}%</span>
                        <span className="text-xs">Score</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        View Results
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!quizStarted ? (
            <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
              <button 
                onClick={() => setActiveQuiz(null)}
                className={`mb-6 flex items-center px-4 py-2 rounded-lg ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <span className="material-icons mr-1">arrow_back</span>
                Back to Quizzes
              </button>
              
              <h1 className="text-3xl font-bold mb-2">{activeQuiz.title}</h1>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}>
                Course: {activeQuiz.course}
              </p>
              
              <div className={`border-2 ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg p-6 mb-6`}>
                <h2 className="text-xl font-semibold mb-4">Quiz Instructions</h2>
                <ul className={`list-disc list-inside space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <li>This quiz contains {activeQuiz.questions.length} questions.</li>
                  <li>You have {activeQuiz.timeLimit} minutes to complete the quiz.</li>
                  <li>You can navigate between questions using the previous and next buttons.</li>
                  <li>You can review your answers before final submission.</li>
                  <li>Once submitted, you cannot retake the quiz.</li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={beginQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                >
                  Begin Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
              {!quizSubmitted ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{activeQuiz.title}</h1>
                    <div className={`px-4 py-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"} flex items-center`}>
                      <span className="material-icons mr-2 text-red-500">timer</span>
                      <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex items-center">
                    <span className={`px-3 py-1 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-100"} text-blue-600`}>
                      Question {currentQuestion + 1} of {activeQuiz.questions.length}
                    </span>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                      {activeQuiz.questions[currentQuestion].question}
                    </h2>
                    
                    <div className="space-y-3">
                      {activeQuiz.questions[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          onClick={() => handleAnswer(activeQuiz.questions[currentQuestion].id, index)}
                          className={`p-4 rounded-lg border-2 cursor-pointer ${
                            userAnswers[activeQuiz.questions[currentQuestion].id] === index
                              ? isDark 
                                ? "border-blue-500 bg-blue-900 bg-opacity-40" 
                                : "border-blue-500 bg-blue-50"
                              : isDark
                                ? "border-gray-700 hover:border-gray-600"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                              userAnswers[activeQuiz.questions[currentQuestion].id] === index
                                ? "bg-blue-500 text-white"
                                : isDark
                                  ? "border border-gray-600"
                                  : "border border-gray-400"
                            }`}>
                              {userAnswers[activeQuiz.questions[currentQuestion].id] === index && (
                                <span className="material-icons text-sm">check</span>
                              )}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button 
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestion === 0}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        currentQuestion === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      <span className="material-icons mr-1">arrow_back</span>
                      Previous
                    </button>
                    
                    {currentQuestion < activeQuiz.questions.length - 1 ? (
                      <button 
                        onClick={goToNextQuestion}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        Next
                        <span className="material-icons ml-1">arrow_forward</span>
                      </button>
                    ) : (
                      <button 
                        onClick={submitQuiz}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {activeQuiz.questions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === currentQuestion
                              ? "bg-blue-600 text-white"
                              : userAnswers[activeQuiz.questions[index].id] !== undefined
                                ? isDark
                                  ? "bg-gray-600 text-white"
                                  : "bg-gray-200 text-gray-800"
                                : isDark
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
                    calculateScore() >= 80
                      ? "bg-green-100 text-green-600"
                      : calculateScore() >= 60
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                  }`}>
                    <span className="text-4xl font-bold">{calculateScore()}%</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}>
                    You've successfully completed the {activeQuiz.title}.
                  </p>
                  
                  <div className={`max-w-md mx-auto p-6 rounded-lg ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  } mb-8`}>
                    <h2 className="font-semibold text-xl mb-4">Results Summary</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Questions:</span>
                        <span className="font-medium">{activeQuiz.questions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct Answers:</span>
                        <span className="font-medium">{
                          activeQuiz.questions.filter(q => 
                            userAnswers[q.id] === q.correctAnswer
                          ).length
                        }</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incorrect Answers:</span>
                        <span className="font-medium">{
                          activeQuiz.questions.filter(q => 
                            userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer
                          ).length
                        }</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unanswered:</span>
                        <span className="font-medium">{
                          activeQuiz.questions.filter(q => 
                            userAnswers[q.id] === undefined
                          ).length
                        }</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-300 flex justify-between font-bold">
                        <span>Score:</span>
                        <span>{calculateScore()}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => setActiveQuiz(null)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Return to Quizzes
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Review Answers
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizzesAndAssessments; 