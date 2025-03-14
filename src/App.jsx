import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Import Home Layout
import HomeLayout from "./pages/HomeLayout";

// Import Admin Dashboard Components
import AdminDashboard from "./pages/admin/Dashboard";
import DashboardOverview from "./pages/admin/DashboardOverview";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";

// Import User Dashboard Components
import UserDashboard from "./pages/user/Dashboard";
import UserDashboardOverview from "./pages/user/DashboardOverview";
import LecturesAndMaterials from "./pages/user/LecturesAndMaterials";
import QuizzesAndAssessments from "./pages/user/QuizzesAndAssessments";
import Certifications from "./pages/user/Certifications";
import DiscussionForum from "./pages/user/DiscussionForum";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
            {
                index: true,
                element: <DashboardOverview />,
            },
            {
                path: "users",
                element: <UserManagement />,
            },
            {
                path: "courses",
                element: <CourseManagement />,
            },
            {
                path: "analytics",
                element: <AnalyticsPage />,
            },
            {
                path: "notifications",
                element: <NotificationsPage />,
            }
        ],
    },
    {
        path: "/user",
        element: <UserDashboard />,
        children: [
            {
                index: true,
                element: <UserDashboardOverview />,
            },
            {
                path: "lectures",
                element: <LecturesAndMaterials />,
            },
            {
                path: "quizzes",
                element: <QuizzesAndAssessments />,
            },
            {
                path: "certifications",
                element: <Certifications />,
            },
            {
                path: "forum",
                element: <DiscussionForum />,
            }
        ],
    }
]);

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
