import './App.css'
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import FeedbackPage from './pages/FeedbackPage';
import ComplaintPage from './pages/ComplaintPage';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    // DashBoard
    path: '/',
    element:(
      <>
        <Sidebar />
        <Dashboard />
      </>
    )
  },
  {
    // login
    path: '/login',
    element:(
      <>
        <LoginPage />
      </>
    )
  },
  {
    // complaints
    path: '/complaints',
    element:(
      <>
        <Sidebar />
        <ComplaintPage />
      </>
    )
  },
  {
    // Feedback
    path: '/feedbacks',
    element:(
      <>
        <Sidebar />
        <FeedbackPage />
      </>
    )
  },
  {
    // Feedback
    path: '*',
    element:(
      <>
        <NotFoundPage />
      </>
    )
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App