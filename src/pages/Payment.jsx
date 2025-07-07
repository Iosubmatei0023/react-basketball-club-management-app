import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft, faCheck, faCreditCard, faCalendarAlt, faUser, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import AnimatedWaveBackground from '../components/AnimatedWaveBackground';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const billingPeriod = location.state?.billingPeriod || 'monthly';
  const { planId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [plan, setPlan] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  // Mock plans data - in a real app, this would come from an API
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      description: 'Hobby Player\nPerfect for casual players who just want to enjoy the game.',
      features: [
        'Limited court access (1x/week)',
        'Access to open gym and friendly matches',
        'No official training required',
        'No uniform or club commitment',
      ]
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      monthlyPrice: '$15/month',
      yearlyPrice: '$150/year', // Save $30 (17%)
      description: 'Junior Membership\nDesigned for kids and teens who want structured training and real team experience.',
      features: [
        'Weekly practice sessions with certified coaches',
        'Participation in youth leagues and tournaments',
        'Club jersey included',
        'Special workshops and team events',
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      monthlyPrice: '$30/month',
      yearlyPrice: '$300/year', // Save $60 (17%)
      description: 'Pro Membership\nFor dedicated athletes looking to train and compete at a higher level.',
      features: [
        'Unlimited access to training and court use',
        'Personalized development plans and performance reviews',
        'Access to competitive matches (regional/national)',
        'Support for recovery, nutrition, and game prep',
        'Priority access to camps, events, and showcases',
      ]
    }
  ];

  // Load plan details
  useEffect(() => {
    const selectedPlan = plans.find(p => p.id === planId);
    
    if (!selectedPlan) {
      navigate('/plans');
      return;
    }
    
    setPlan({ ...selectedPlan, displayPrice: billingPeriod === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice });
    setIsLoading(false);
  }, [planId, navigate]);
  
  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    
    return value;
  };
  
  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format based on input type
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Validate field
    validateField(name, formattedValue);
  };
  
  // Validate a single field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'cardNumber':
        const cardNumberValue = value.replace(/\s/g, '');
        if (cardNumberValue.length > 0 && cardNumberValue.length !== 16) {
          error = 'Card number must be 16 digits';
        }
        break;
        
      case 'cardName':
        if (value.length > 0 && value.trim().length < 3) {
          error = 'Please enter a valid name';
        }
        break;
        
      case 'expiry':
        const expiryValue = value.replace(/\//g, '');
        if (expiryValue.length > 0 && expiryValue.length !== 4) {
          error = 'Please enter a valid expiry date (MM/YY)';
        } else if (expiryValue.length === 4) {
          const month = parseInt(expiryValue.substring(0, 2), 10);
          const year = parseInt(expiryValue.substring(2), 10);
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          
          if (month < 1 || month > 12) {
            error = 'Invalid month';
          } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
            error = 'Card has expired';
          }
        }
        break;
        
      case 'cvv':
        if (value.length > 0 && (value.length < 3 || value.length > 4)) {
          error = 'CVV must be 3-4 digits';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };
  
  // Validate entire form
  const validateForm = () => {
    const fields = ['cardNumber', 'cardName', 'expiry', 'cvv'];
    let isValid = true;
    
    // Validate each field
    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Disable the submit button and show loading state
    setIsProcessing(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to plans page with success state
      navigate('/plans', { 
        state: { 
          paymentSuccess: true,
          planName: plan?.name || 'your subscription'
        } 
      });
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'Payment failed. Please try again.'
      }));
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Add class to inputs when they have a value
  const getInputClassName = (fieldName) => {
    return `form-control ${formData[fieldName] ? 'has-value' : ''} ${errors[fieldName] ? 'error' : ''}`;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <AnimatedWaveBackground />
      <div className="payment-container">
        <a href="/plans" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Plans
        </a>
        
        <div className="payment-layout">
          <div className="payment-form-container">
            <div className="payment-header">
              <h2>Payment Information</h2>
              <p>Complete your subscription by entering your payment details</p>
            </div>
            
            <form onSubmit={handleSubmit} className="payment-form" noValidate>
              <div className="form-group">
                <label htmlFor="cardNumber">
                  <FontAwesomeIcon icon={faCreditCard} /> Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  onBlur={(e) => validateField('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={getInputClassName('cardNumber')}
                  autoComplete="cc-number"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cardName">
                  <FontAwesomeIcon icon={faUser} /> Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  onBlur={(e) => validateField('cardName', e.target.value)}
                  placeholder="John Doe"
                  className={getInputClassName('cardName')}
                  autoComplete="cc-name"
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField('expiry', e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={getInputClassName('expiry')}
                    autoComplete="cc-exp"
                  />
                  {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">
                    <FontAwesomeIcon icon={faLock} /> CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField('cvv', e.target.value)}
                    placeholder="123"
                    maxLength="4"
                    className={getInputClassName('cvv')}
                    autoComplete="cc-csc"
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
              
              <button
                type="submit"
                className={`pay-now-button ${isProcessing ? 'processing' : ''}`}
                disabled={
                  isProcessing ||
                  !formData.cardNumber ||
                  !formData.cardName ||
                  !formData.expiry ||
                  !formData.cvv ||
                  Object.values(errors).some(error => error)
                }
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  plan?.displayPrice ? `Pay ${plan.displayPrice}` : 'Pay'
                )}
              </button>
              
              <div className="secure-payment">
                <FontAwesomeIcon icon={faShieldAlt} className="lock-icon" />
                <span>Your payment is secure and encrypted with 256-bit SSL</span>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="plan-details">
              <h4 className="plan-name">{plan?.name || 'Loading...'}</h4>
              <div className="plan-price">
                {plan?.displayPrice}
                {billingPeriod === 'yearly' && plan?.monthlyPrice !== 'Free' && (
                  <span className="save-badge">Save 17%</span>
                )}
              </div>
            </div>
            <div className="plan-features">
              <h4>Plan includes:</h4>
              <ul>
                {plan?.features?.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                )) || (
                  <li>Loading features...</li>
                )}
              </ul>
            </div>
            
            <div className="total">
              <span>Total</span>
              <span className="amount">{plan?.displayPrice}</span>
            </div>
            
            <div className="payment-methods">
              <span>We accept:</span>
              <div className="card-icons" style={{ alignItems: 'center' }}>
                <div className="card-icon visa">Visa</div>
                <div className="card-icon mastercard">MC</div>
                <div className="card-icon amex">Amex</div>
                <button
                  type="button"
                  className="back-to-plans-btn"
                  onClick={() => navigate('/plans')}
                  style={{ marginLeft: '18px', height: '32px', padding: '0 18px', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.85)', color: '#4a6cf7', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 6px rgba(124,176,255,0.08)', transition: 'background .2s' }}
                >
                  Back to Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
