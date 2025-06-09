import React from "react";
import {
    CalendarIcon,
    UserIcon,
    TagIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Blog = () => {
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

    const featuredPostStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        marginBottom: "3rem",
    };

    const featuredImageStyle: CSSProperties = {
        width: "100%",
        height: "24rem",
        objectFit: "cover",
    };

    const featuredContentStyle: CSSProperties = {
        padding: "2rem",
    };

    const postCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const postImageStyle: CSSProperties = {
        width: "100%",
        height: "12rem",
        objectFit: "cover",
    };

    const postContentStyle: CSSProperties = {
        padding: "1.5rem",
    };

    const postTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const postExcerptStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
        marginBottom: "1rem",
    };

    const metaStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
        marginBottom: "1rem",
    };

    const tagStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.25rem 0.75rem",
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
        borderRadius: "1rem",
        fontSize: "0.875rem",
        fontWeight: 500,
    };

    const readMoreStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "var(--color-primary-600)",
        fontSize: "0.875rem",
        fontWeight: 500,
        textDecoration: "none",
    };

    const posts = [
        {
            title: "The Science of Focus: How to Train Your Brain for Better Concentration",
            excerpt:
                "Discover the neuroscience behind focus and learn practical techniques to improve your concentration and productivity.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            author: "Dr. Sarah Johnson",
            date: "March 15, 2024",
            category: "Productivity",
            featured: true,
        },
        {
            title: "10 Time Management Techniques That Actually Work",
            excerpt:
                "Explore proven time management strategies that can help you make the most of your day and achieve your goals.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            author: "Michael Chen",
            date: "March 12, 2024",
            category: "Time Management",
        },
        {
            title: "Building a Productive Morning Routine",
            excerpt:
                "Learn how to create a morning routine that sets you up for success and helps you maintain high energy throughout the day.",
            image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
            author: "Emma Wilson",
            date: "March 10, 2024",
            category: "Lifestyle",
        },
        {
            title: "The Power of Deep Work in a Distracted World",
            excerpt:
                "Understand the concept of deep work and how it can help you achieve more in less time while maintaining quality.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            author: "David Thompson",
            date: "March 8, 2024",
            category: "Productivity",
        },
        {
            title: "How to Overcome Procrastination: A Practical Guide",
            excerpt:
                "Discover effective strategies to overcome procrastination and develop a more proactive approach to your tasks.",
            image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
            author: "Lisa Martinez",
            date: "March 5, 2024",
            category: "Psychology",
        },
        {
            title: "The Role of Breaks in Maintaining Productivity",
            excerpt:
                "Learn why taking regular breaks is essential for maintaining high productivity and how to optimize your break times.",
            image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
            author: "James Wilson",
            date: "March 3, 2024",
            category: "Wellness",
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Blog</h1>
                <p style={subtitleStyle}>
                    Insights, tips, and strategies to help you improve your
                    productivity and achieve your goals.
                </p>
            </div>

            {posts.map((post, index) =>
                post.featured ? (
                    <div key={index} style={featuredPostStyle}>
                        <img
                            src={post.image}
                            alt={post.title}
                            style={featuredImageStyle}
                        />
                        <div style={featuredContentStyle}>
                            <div style={metaStyle}>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <UserIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.author}
                                </span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <CalendarIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.date}
                                </span>
                                <span style={tagStyle}>
                                    <TagIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.category}
                                </span>
                            </div>
                            <h2 style={postTitleStyle}>{post.title}</h2>
                            <p style={postExcerptStyle}>{post.excerpt}</p>
                            <a href="#" style={readMoreStyle}>
                                Read More
                                <ArrowRightIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div key={index} style={postCardStyle}>
                        <img
                            src={post.image}
                            alt={post.title}
                            style={postImageStyle}
                        />
                        <div style={postContentStyle}>
                            <div style={metaStyle}>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <UserIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.author}
                                </span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <CalendarIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.date}
                                </span>
                            </div>
                            <h3 style={postTitleStyle}>{post.title}</h3>
                            <p style={postExcerptStyle}>{post.excerpt}</p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span style={tagStyle}>
                                    <TagIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    {post.category}
                                </span>
                                <a href="#" style={readMoreStyle}>
                                    Read More
                                    <ArrowRightIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Blog;
