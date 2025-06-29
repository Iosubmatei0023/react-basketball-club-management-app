import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function SubscriptionsPage() {
  const navigate = useNavigate();
  const subscriptions = [
    {
      id: 1,
      name: "Junior Plan (Ages 6–12)",
      price: 20,
      description:
        "Fun and engaging basketball training twice a week, focused on building basic skills, confidence, and teamwork in a supportive environment. Perfect for beginners and young players.",
      features: [
        "2x Weekly Training Sessions",
        "Basic Skills Development",
        "Team Building Activities",
        "Age-Appropriate Drills",
        "Supportive Learning Environment",
      ],
    },
    {
      id: 2,
      name: "Pro Plan (Ages 13-17)",
      price: 30,
      description:
        "High-intensity training for dedicated players aiming to compete at a higher level. Includes advanced drills, tactical development, and participation in official matches and tournaments.",
      features: [
        "3x Weekly Intensive Training",
        "Advanced Skills Training",
        "Tactical Development",
        "Match Participation",
        "Tournament Access",
      ],
    },
    {
      id: 3,
      name: "Performance Plan (18+)",
      price: 40,
      description:
        "Elite-level training for ambitious athletes focused on performance, conditioning, and competitive play. Includes personalized coaching, strength & agility sessions, and exposure to scouting opportunities.",
      features: [
        "4x Weekly Elite Training",
        "Personalized Coaching",
        "Strength & Conditioning",
        "Scouting Opportunities",
        "Competitive Development",
      ],
    },
  ];

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Link to="/" style={{
        color: '#7cb0ff',
        textDecoration: 'none',
        marginBottom: '2rem',
        display: 'block'
      }}>
        ← Back to Homepage
      </Link>
      <h1 style={{
        color: '#7cb0ff',
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>Choose Your Plan</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {subscriptions.map((subscription) => (
          <div key={subscription.id} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#7cb0ff',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>{subscription.name}</h3>
            <p style={{
              fontSize: '2rem',
              color: '#7cb0ff',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>${subscription.price}/month</p>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>{subscription.description}</p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              marginBottom: '1.5rem'
            }}>
              {subscription.features.map((feature, index) => (
                <li key={index} style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#7cb0ff'
                  }}></span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/account" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: '#7cb0ff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              Subscribe
            </Link>
          </div>
        ))}
      </div>
      <Link to="/account" className="back-link">
        Back to Account
      </Link>
    </div>
  );
}

export default SubscriptionsPage;
