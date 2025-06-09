import React from "react";
import {
    CheckIcon,
    XMarkIcon,
    StarIcon,
    RocketLaunchIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Pricing = () => {
    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle: CSSProperties = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem",
    };

    const planCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        display: "flex",
        flexDirection: "column",
    };

    const popularPlanCardStyle: CSSProperties = {
        ...planCardStyle,
        border: "2px solid var(--color-primary-600)",
        position: "relative",
    };

    const popularBadgeStyle: CSSProperties = {
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
    };

    const planIconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const planTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const planPriceStyle: CSSProperties = {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const planPeriodStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-500)",
        marginBottom: "1.5rem",
    };

    const featureListStyle: CSSProperties = {
        listStyle: "none",
        padding: 0,
        margin: "1.5rem 0",
        flex: 1,
    };

    const featureItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        marginBottom: "0.75rem",
    };

    const buttonStyle: CSSProperties = {
        background: "var(--color-primary-600)",
        color: "var(--color-white)",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        width: "100%",
        marginTop: "auto",
    };

    const secondaryButtonStyle: CSSProperties = {
        ...buttonStyle,
        background: "var(--color-white)",
        color: "var(--color-primary-600)",
        border: "1px solid var(--color-primary-600)",
    };

    const plans = [
        {
            icon: <StarIcon style={planIconStyle} />,
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
            buttonStyle: secondaryButtonStyle,
        },
        {
            icon: <RocketLaunchIcon style={planIconStyle} />,
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
            buttonStyle: buttonStyle,
            popular: true,
        },
        {
            icon: <SparklesIcon style={planIconStyle} />,
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
            buttonStyle: secondaryButtonStyle,
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Simple, Transparent Pricing</h1>
                <p style={subtitleStyle}>
                    Choose the perfect plan for your productivity needs. All
                    plans include a 14-day free trial.
                </p>
            </div>

            <div style={gridStyle}>
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        style={
                            plan.popular ? popularPlanCardStyle : planCardStyle
                        }
                    >
                        {plan.popular && (
                            <div style={popularBadgeStyle}>Most Popular</div>
                        )}
                        {plan.icon}
                        <h2 style={planTitleStyle}>{plan.title}</h2>
                        <div style={planPriceStyle}>{plan.price}</div>
                        <div style={planPeriodStyle}>/{plan.period}</div>

                        <ul style={featureListStyle}>
                            {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} style={featureItemStyle}>
                                    <CheckIcon
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                            color: "var(--color-green-500)",
                                        }}
                                    />
                                    {feature}
                                </li>
                            ))}
                            {plan.excluded.map((feature, featureIndex) => (
                                <li key={featureIndex} style={featureItemStyle}>
                                    <XMarkIcon
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                            color: "var(--color-red-500)",
                                        }}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button style={plan.buttonStyle}>
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
