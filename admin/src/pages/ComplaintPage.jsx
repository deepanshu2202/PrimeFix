import '../styles/pages/complaintpage.css'
import ReviewItem from './../components/ReviewItem';

const ComplaintPage = () => {
  return (
    <div className='complaint-page-root'>
      <div className="complaint-page-header">
        <h1>COMPLAINTS</h1>
      </div>
      <div className="complaint-item-container"></div>
    </div>
  )
}

export default ComplaintPage