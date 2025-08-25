import "./App.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import authLoader from "./utils/authLoader";
import NotFoundPage from "./pages/NotFoundPage";
import FeedbackPage from "./pages/FeedbackPage";
import ComplaintPage from "./pages/ComplaintPage";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    // DashBoard
    path: "/",
    element: (
      <>
        <Sidebar />
        <Dashboard />
      </>
    ),
    loader: authLoader,
  },
  {
    // login
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    // complaints
    path: "/complaints",
    element: (
      <>
        <Sidebar />
        <ComplaintPage />
      </>
    ),
    loader: authLoader,
  },
  {
    // Feedback
    path: "/feedbacks",
    element: (
      <>
        <Sidebar />
        <FeedbackPage />
      </>
    ),
    loader: authLoader,
  },
  {
    // Feedback
    path: "*",
    element: (
      <>
        <NotFoundPage />
      </>
    ),
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
   
  );
};

export default App;
