import "./App.css";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/loader";
import { Toaster } from "react-hot-toast";
import authLoader from "./utils/authLoader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ✅ Lazy imports for pages
const WorkPage = lazy(() => import("./pages/WorkPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const withNavbar = (children) => (
  <>
    <Navbar />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withNavbar(<HomePage />),
    loader: authLoader,
  },
  {
    path: "/history",
    element: withNavbar(<HistoryPage />),
    loader: authLoader,
  },
  {
    path: "/profile",
    element: withNavbar(<ProfilePage />),
    loader: authLoader,
  },
  {
    path: "/service",
    element: withNavbar(<ServicePage />),
    loader: authLoader,
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
    element: withNavbar(<WorkPage />),
    loader: authLoader,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <div className="app-root">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} hydrateFallbackElement={<div />} />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
