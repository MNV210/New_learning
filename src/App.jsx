import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Import Admin Dashboard Components
import AdminDashboard from "./pages/admin/Dashboard";
import DashboardOverview from "./pages/admin/DashboardOverview";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";

const router = createBrowserRouter([
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
]);

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
