import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

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

const Pricing = () => {
    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
        },
        pricingSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        pricingContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        pricingTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '3rem',
        },
        pricingGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
        },
        pricingCard: {
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '2.5rem 2rem',
            borderRadius: '1rem',
            transition: 'all 0.3s ease',
            border: '2px solid #334155',
            textAlign: 'center',
            position: 'relative',
        },
        pricingCardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        pricingCardFeatured: {
            borderColor: '#38bdf8',
            transform: 'scale(1.05)',
        },
        pricingPlan: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '1rem',
        },
        pricingPrice: {
            fontSize: '3rem',
            fontWeight: '800',
            color: '#38bdf8',
            marginBottom: '0.5rem',
        },
        pricingPeriod: {
            color: '#94a3b8',
            fontSize: '1rem',
        },
        pricingFeatures: {
            listStyle: 'none',
            margin: '2rem 0',
            textAlign: 'left',
            padding: '0',
        },
        pricingFeatureItem: {
            padding: '0.5rem 0',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
        },
        checkmark: {
            color: '#38bdf8',
            fontWeight: 'bold',
            flexShrink: 0,
        },
        pricingBtn: {
            background: 'linear-gradient(to right, #0ea5e9, #0ea5e9)',
            color: '#ffffff',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%',
            marginTop: '1rem',
            boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
        },
        pricingBtnHover: {
            background: 'linear-gradient(to right, #0284c7, #0284c7)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3), 0 4px 6px -2px rgba(14, 165, 233, 0.05)',
        },
    };

    return (
        <div style={styles.landingPage}>
            <LandingNavbar />
            <main style={styles.pricingSection}>
                <div style={styles.pricingContainer}>
                    <h1 style={styles.pricingTitle}>Simple, Transparent Pricing</h1>
                    <p
                        style={{
                            textAlign: "center",
                            maxWidth: "36rem",
                            margin: "0 auto 3rem",
                            fontSize: "1.25rem",
                            color: "#94a3b8",
                            lineHeight: "1.6",
                        }}
                    >
                        Choose the perfect plan for your productivity needs. All
                        plans include a 14-day free trial.
                    </p>
                    <div style={styles.pricingGrid}>
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={!plan.popular ? "hover-card" : ""}
                                style={{
                                    ...styles.pricingCard,
                                    ...(plan.popular ? styles.pricingCardFeatured : {})
                                }}
                            >
                                {plan.popular && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "-0.75rem",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "linear-gradient(to right, #0ea5e9, #0ea5e9)",
                                            color: "#ffffff",
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
                                <h3 style={styles.pricingPlan}>{plan.title}</h3>
                                <div style={styles.pricingPrice}>
                                    {plan.price}
                                    <span style={styles.pricingPeriod}>
                                        /{plan.period}
                                    </span>
                                </div>
                                <ul style={styles.pricingFeatures}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} style={styles.pricingFeatureItem}>
                                            <span style={styles.checkmark}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                    {plan.excluded.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            style={{
                                                ...styles.pricingFeatureItem,
                                                opacity: 0.5,
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    style={styles.pricingBtn}
                                >
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
};

export default Pricing;
