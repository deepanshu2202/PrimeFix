import './App.css'
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import FeedbackPage from './pages/FeedbackPage';
import ComplaintPage from './pages/ComplaintPage';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

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
    path: '/feedback',
    element:(
      <>
        <Sidebar />
        <FeedbackPage />
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