import '../styles/components/sidebar.css'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidebar-root'>
        <h2>PrimeFix</h2>
        <div onClick={() => navigate('/')}>Requests</div>
        <div onClick={() => navigate('/complaints')}>Complaints</div>
        <div onClick={() => navigate('/feedback')}>Feedbacks</div>
    </div>
  )
}

export default Sidebar