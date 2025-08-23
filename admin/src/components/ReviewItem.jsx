import "../styles/components/reviewitem.css";

const ReviewItem = ({ customer, text }) => {
  return (
    <div className="review-item-root">
      <ul className="review-customer-details">
        <li>{customer.name}</li>
        <li>{customer.email}</li>
        <li>{customer.phone}</li>
      </ul>

      <p className="review-text">{text}</p>
    </div>
  );
};

export default ReviewItem;
