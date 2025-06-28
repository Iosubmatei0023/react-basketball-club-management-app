import React from "react";
import { Link } from "react-router-dom";

function SubscriptionsPage() {
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
    <div className="subscriptions-container">
      <div className="plans-grid">
        {subscriptions.map((subscription) => (
          <div className="subscription-card" key={subscription.id}>
            <h2>{subscription.name}</h2>
            <h3>${subscription.price}/month</h3>
            <p className="plan-description">{subscription.description}</p>
            <ul className="features-list">
              {subscription.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="select-plan-btn"
              onClick={() => handleSelectPlan(subscription)}
            >
              Select this plan
            </button>
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
