import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBasketballBall, faTrophy, faCrown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
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
      monthlyPrice: '$15/month',
      yearlyPrice: '$150/year', // Save $30 (17%)
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
      monthlyPrice: '$30/month',
      yearlyPrice: '$300/year', // Save $60 (17%)
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

  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

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
        {/* Billing period toggle */}
        <div className="billing-toggle-row">
          <span className={billingPeriod === 'monthly' ? 'billing-label active' : 'billing-label'}>Monthly</span>
          <label className="billing-switch">
            <input type="checkbox" checked={billingPeriod === 'yearly'} onChange={e => setBillingPeriod(e.target.checked ? 'yearly' : 'monthly')} />
            <span className="slider" />
          </label>
          <span className={billingPeriod === 'yearly' ? 'billing-label active' : 'billing-label'}>Yearly</span>
        </div>
        <div className="plans-grid">
          {plans.map((plan, index) => {
            let icon;
            if (plan.title.toLowerCase().includes('basic')) {
              icon = <FontAwesomeIcon icon={['fas', 'basketball-ball']} className="plan-card-icon" />;
            } else if (plan.title.toLowerCase().includes('pro')) {
              icon = <FontAwesomeIcon icon={['fas', 'trophy']} className="plan-card-icon" />;
            } else {
              icon = <FontAwesomeIcon icon={['fas', 'crown']} className="plan-card-icon" />;
            }
            return (
              <div key={index} className={`plan-card modern ${plan.title.toLowerCase()} plan-offset-${plan.title.toLowerCase()}`}>
                <div className="plan-card-accent">{icon}</div>
                <h2 className="plan-title modern-title">{plan.title}</h2>
                <div className="plan-price modern-price">
                  {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  {billingPeriod === 'yearly' && plan.monthlyPrice !== 'Free' && (
                    <span className="save-badge">Save 17%</span>
                  )}
                </div>
                {plan.description && <p className="plan-description modern-desc">{plan.description}</p>}
                <ul className="plan-features modern-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="plan-feature modern-feature">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} className="feature-icon check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="plan-button modern-btn"
                  style={{ background: 'linear-gradient(90deg, #7cb0ff 0%, #ffb07c 100%)', color: '#fff', marginTop: '1rem' }}
                  onClick={() => { navigate(plan.button.link, { state: { billingPeriod } }); }}
                >
                  {plan.button.text} <FontAwesomeIcon icon={['fas', 'arrow-right']} style={{ marginLeft: 8 }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plans;
