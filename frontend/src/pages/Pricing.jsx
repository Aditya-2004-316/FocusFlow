import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../LandingPage/LandingPage.css";

const plans = [
    {
        icon: "🆓",
        title: "Free",
        price: "$0",
        period: "forever",
        features: [
            "Basic focus timer",
            "Daily statistics",
            "Basic notifications",
            "Community access",
            "Limited resources",
        ],
        excluded: [
            "Advanced analytics",
            "Custom themes",
            "Priority support",
            "Team features",
            "API access",
        ],
        buttonText: "Get Started",
        popular: false,
    },
    {
        icon: "⭐",
        title: "Pro",
        price: "$9.99",
        period: "per month",
        features: [
            "Advanced focus timer",
            "Detailed analytics",
            "Custom notifications",
            "Premium resources",
            "Custom themes",
            "Priority support",
        ],
        excluded: ["Team features", "API access", "Custom integrations"],
        buttonText: "Start Free Trial",
        popular: true,
    },
    {
        icon: "🏢",
        title: "Enterprise",
        price: "$29.99",
        period: "per month",
        features: [
            "All Pro features",
            "Team collaboration",
            "API access",
            "Custom integrations",
            "Dedicated support",
            "Advanced security",
            "Custom branding",
        ],
        excluded: [],
        buttonText: "Contact Sales",
        popular: false,
    },
];

const Pricing = () => (
    <div className="landing-page">
        <LandingNavbar />
        <main className="pricing-section">
            <div className="pricing-container">
                <h1 className="pricing-title">Simple, Transparent Pricing</h1>
                <p
                    className="hero-subtitle"
                    style={{
                        textAlign: "center",
                        maxWidth: "36rem",
                        margin: "0 auto 3rem",
                    }}
                >
                    Choose the perfect plan for your productivity needs. All
                    plans include a 14-day free trial.
                </p>
                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card${
                                plan.popular ? " featured" : ""
                            }`}
                        >
                            {plan.popular && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-0.75rem",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "var(--color-primary-600)",
                                        color: "var(--color-white)",
                                        padding: "0.25rem 1rem",
                                        borderRadius: "1rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    Most Popular
                                </div>
                            )}
                            <div
                                style={{
                                    fontSize: "2.5rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                {plan.icon}
                            </div>
                            <h3 className="pricing-plan">{plan.title}</h3>
                            <div className="pricing-price">
                                {plan.price}
                                <span className="pricing-period">
                                    /{plan.period}
                                </span>
                            </div>
                            <ul className="pricing-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>{feature}</li>
                                ))}
                                {plan.excluded.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        style={{
                                            opacity: 0.5,
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="pricing-btn">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default Pricing;
