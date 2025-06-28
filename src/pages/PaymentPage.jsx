import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { planId } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const plans = {
    1: {
      name: "Junior Plan (Ages 6–12)",
      price: 20,
    },
    2: {
      name: "Pro Plan (Ages 13-17)",
      price: 30,
    },
    3: {
      name: "Performance Plan (18+)",
      price: 40,
    },
  };

  const selectedPlan = plans[planId];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    // For now, we'll just navigate to a success page
    navigate("/payment-success");
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1>Complete Your Payment</h1>

        <div className="plan-details">
          <h2>Plan Details</h2>
          <div className="selected-plan">
            <h3>Selected Plan:</h3>
            <p>{selectedPlan.name}</p>
            <h3>Price:</h3>
            <p>${selectedPlan.price}/month</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <button type="submit" className="pay-now-btn">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
