import '../styles/pages/complaintpage.css'
import ReviewItem from './../components/ReviewItem';

const ComplaintPage = () => {
  return (
    <div className='complaint-page-root'>
      <div className="complaint-page-header">
        <h1>COMPLAINTS</h1>
      </div>
      <div className="complaint-item-container">
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text" />
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
        <ReviewItem customer={{name:"name", email:"email", phone:"phone"}} text="This is a text"/>
      </div>
    </div>
  )
}

export default ComplaintPage