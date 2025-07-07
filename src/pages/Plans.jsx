import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Plans.css';
import EventsNavbar from '../components/EventsNavbar';

const Plans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success state in location state
    if (location.state?.paymentSuccess) {
      setSuccessMessage(`Successfully subscribed to ${location.state.planName}!`);
      setShowSuccess(true);
      
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
        // No navigate call here – just hide the popup
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname]);
  const plans = [
    {
      title: 'Basic',
      price: 'Free',
      description: 'Hobby Player\nPerfect for casual players who just want to enjoy the game.',
      features: [
        'Limited court access (1x/week)',
        'Access to open gym and friendly matches',
        'No official training required',
        'No uniform or club commitment',
      ],
      button: {
        text: 'Buy',
        color: '#7cb0ff',
        link: '/payment/basic'
      }
    },
    {
      title: 'Pro',
      price: '$15/month',
      description: 'Junior Membership\nDesigned for kids and teens who want structured training and real team experience.',
      features: [
        'Weekly practice sessions with certified coaches',
        'Participation in youth leagues and tournaments',
        'Club jersey included',
        'Special workshops and team events',
      ],
      button: {
        text: 'Buy',
        color: '#7cb0ff',
        link: '/payment/pro'
      }
    },
    {
      title: 'Premium',
      price: '$30/month',
      description: 'Pro Membership\nFor dedicated athletes looking to train and compete at a higher level.',
      features: [
        'Unlimited access to training and court use',
        'Personalized development plans and performance reviews',
        'Access to competitive matches (regional/national)',
        'Support for recovery, nutrition, and game prep',
        'Priority access to camps, events, and showcases',
      ],
      button: {
        text: 'Buy',
        color: '#7cb0ff',
        link: '/payment/premium'
      }
    }
  ];

  return (
    <div className="plans-page">
      <EventsNavbar />
      {showSuccess && (
        <div className="payment-success-message">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          {successMessage}
        </div>
      )}
      <div className="plans-container">
        <h1 className="plans-title">Choose Your Plan</h1>
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.title.toLowerCase()}`}>
              <div className="plan-content">
                <h2 className="plan-title">{plan.title}</h2>
                <div className="plan-price">{plan.price}</div>
                {plan.description && <p className="plan-description">{plan.description}</p>}
                <div className="plan-separator"></div>
                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="plan-feature">
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="plan-button"
                style={{ backgroundColor: plan.button.color }}
                onClick={() => { console.log('Navigating to', plan.button.link); navigate(plan.button.link); }}
              >
                {plan.button.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
