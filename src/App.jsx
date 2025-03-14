import { createBrowserRouter, RouterProvider } from "react-router-dom";

 // Import ExerciseInfoPage

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
