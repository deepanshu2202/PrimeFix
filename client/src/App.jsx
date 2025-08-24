import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import ServicePage from "./pages/ServicePage";
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkPage from "./pages/WorkPage";

// import authLoader from './utils/authLoader';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <HomePage />
      </>
    ),
    // loader: authLoader
  },
  {
    path: "/history",
    element: (
      <>
        <Navbar />
        <HistoryPage />
      </>
    ),
    // loader: authLoader
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <ProfilePage />
      </>
    ),
  },
  {
    path: "/service",
    element: (
      <>
        <Navbar />
        <ServicePage />
      </>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/work",
    element: (
      <>
        <Navbar />
        <WorkPage />
      </>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;