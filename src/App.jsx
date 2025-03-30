import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import Home Layout
import HomeLayout from "./pages/HomeLayout";

// Import Admin Dashboard Components
import AdminDashboard from "./pages/admin/Dashboard";
import DashboardOverview from "./pages/admin/DashboardOverview";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import CourseDetail from "./pages/admin/CourseDetail";
import LessonManagement from "./pages/admin/LessonManagement";
import QuestionManagement from "./pages/admin/QuestionManagement";

// Import User Dashboard Components
import UserDashboard from "./pages/user/Dashboard";
import UserDashboardOverview from "./pages/user/DashboardOverview";
import LecturesAndMaterials from "./pages/user/LecturesAndMaterials";
import QuizzesAndAssessments from "./pages/user/QuizzesAndAssessments";
import QuizApp from "./pages/user/MakeQuizz";
import Certifications from "./pages/user/Certifications";
import DiscussionForum from "./pages/user/DiscussionForum";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LectureDetails from "./components/lectures/LectureDetails";
import LessonView from "./components/lectures/LessonView";

// Thành phần lót giữa để cung cấp useNavigate cho AuthProvider
const AuthWithRouter = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <AuthProvider onNavigate={navigate}>
      {children}
    </AuthProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthWithRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="lecture/:id/details" element={<LessonManagement />} />
              <Route path="course/:id" element={<CourseDetail />} />
              <Route path="quiz/:quizId/questions" element={<QuestionManagement />} />
            </Route>
            
            <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
              <Route index element={<UserDashboardOverview />} />
              <Route path="lectures" element={<LecturesAndMaterials />} />
              <Route path="lecture/:id" element={<LectureDetails />} />
              <Route path="learn/:course_id/lesson/:lesson_id" element={<LessonView />} />
              <Route path="quizzes" element={<QuizzesAndAssessments />} />
              <Route path="quiz/:courseId/:quizId/take" element={<QuizApp />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="forum" element={<DiscussionForum />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthWithRouter>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
