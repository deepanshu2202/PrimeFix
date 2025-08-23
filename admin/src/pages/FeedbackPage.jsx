import '../styles/pages/feedbackpage.css'
import ReviewItem from './../components/ReviewItem';

const FeedbackPage = () => {
  return (
    <div className='feedback-page-root'>
      <div className="feedback-page-header">
        <h1>FEEDBACKS</h1>
      </div>
      <div className="feedback-item-container">
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

export default FeedbackPage