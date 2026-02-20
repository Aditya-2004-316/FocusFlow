import React, { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const posts = [
    {
        title: "The Science of Focus: How to Train Your Brain for Better Concentration",
        excerpt:
            "Discover the neuroscience behind focus and learn practical techniques to improve your concentration and productivity.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1470&q=80",
        author: "Dr. Sarah Johnson",
        date: "March 15, 2024",
        category: "Productivity",
        featured: true,
        content: [
            "Focus is not a talent — it is a trainable skill rooted in neuroscience. The prefrontal cortex, the brain region responsible for decision-making and attention, can be strengthened through deliberate practice, much like a muscle responds to consistent exercise.",
            "Research from the University of California shows that the average knowledge worker is interrupted every 11 minutes and takes roughly 25 minutes to fully refocus on the original task. This constant context-switching drains cognitive resources and leads to what neuroscientists call 'attention residue' — traces of the previous task that linger and reduce performance on the current one.",
            "One of the most effective techniques for training focus is the Pomodoro Technique: work in focused 25-minute blocks followed by 5-minute breaks. This method works because it aligns with the brain's natural attention cycles. After about 20-30 minutes of sustained focus, neural fatigue sets in and a short break allows the prefrontal cortex to recover.",
            "Another powerful approach is mindfulness meditation. Studies published in the journal Psychological Science found that just two weeks of regular meditation practice — as little as 10 minutes daily — significantly improved participants' working memory and GRE reading comprehension scores. Meditation trains the brain to notice when attention has wandered and gently redirect it, strengthening the neural pathways involved in sustained focus.",
            "Environmental design also plays a crucial role. Keep your workspace free from visual clutter, silence non-essential notifications, and consider using ambient background sounds (brown noise or lo-fi music) to create a consistent auditory environment. The brain adapts to these cues over time, associating them with deep focus states.",
            "Finally, sleep cannot be overlooked. During deep sleep, the brain consolidates memories and clears metabolic waste products that accumulate during waking hours. Getting 7-9 hours of quality sleep consistently is perhaps the single most impactful thing you can do for your ability to focus the next day.",
            "Start small: pick one technique, practice it for two weeks, and notice how your capacity for sustained concentration gradually expands. Focus is a skill. Like any skill, it gets better with practice."
        ],
    },
    {
        title: "10 Time Management Techniques That Actually Work",
        excerpt:
            "Explore proven time management strategies that can help you make the most of your day and achieve your goals.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1470&q=80",
        author: "Michael Chen",
        date: "March 12, 2024",
        category: "Time Management",
        featured: false,
        content: [
            "Time management is less about managing time and more about managing energy and priorities. Here are ten techniques that have been battle-tested by thousands of productive professionals.",
            "1. Time Blocking — Assign specific blocks of your calendar to specific tasks. Instead of a vague to-do list, you create a concrete schedule: 9-10 AM for deep writing, 10-10:30 AM for email, and so on. This eliminates decision fatigue about what to work on next.",
            "2. The Two-Minute Rule — Borrowed from David Allen's 'Getting Things Done' methodology: if a task takes less than two minutes, do it immediately. This prevents small tasks from piling up into an overwhelming backlog.",
            "3. Eat the Frog — Tackle your most challenging or dreaded task first thing in the morning when your willpower and cognitive resources are at their peak. Everything after that feels easier by comparison.",
            "4. The Eisenhower Matrix — Categorize tasks into four quadrants: urgent and important, important but not urgent, urgent but not important, and neither. Focus your energy on quadrant two (important but not urgent) for long-term success.",
            "5. Batching — Group similar tasks together and complete them in a single session. Answer all emails at once, make all phone calls back-to-back, or process all administrative tasks in one block. This reduces the cognitive cost of switching between different types of work.",
            "6. The 80/20 Rule (Pareto Principle) — Roughly 80% of your results come from 20% of your efforts. Identify which tasks and activities drive the most value and prioritize those ruthlessly.",
            "7. Weekly Reviews — Spend 30 minutes every Sunday evening reviewing the past week and planning the upcoming one. This habit creates a feedback loop that helps you continuously improve your time allocation.",
            "8. Strategic Saying No — Every yes is a no to something else. Protect your time by declining requests that don't align with your top priorities. A polite 'I can't commit to this right now' is a powerful productivity tool.",
            "9. Energy Mapping — Track your energy levels throughout the day for a week. Schedule your most demanding tasks during peak energy periods and routine tasks during natural dips.",
            "10. The Shutdown Ritual — Create a consistent end-of-day routine: review tomorrow's calendar, capture any loose thoughts, and formally 'close' your workday. This helps your brain disengage and recharge for the next day."
        ],
    },
    {
        title: "Designing Workflows that Flow Smoothly",
        excerpt:
            "Craft a workspace and routine that keeps you in the zone for longer stretches without burnout.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80",
        author: "FocusFlow Team",
        date: "February 28, 2024",
        category: "Workflow",
        featured: false,
        content: [
            "A well-designed workflow is invisible. When everything is in the right place and transitions between tasks are seamless, you barely notice the system itself — you just notice that you're getting more done with less stress.",
            "Start by mapping your current workflow. Write down every step you take for your most common tasks, from start to finish. Include the tools you open, the communications you send, and the decisions you make. This audit often reveals surprising inefficiencies: redundant steps, unnecessary approvals, or tools that don't talk to each other.",
            "Next, identify your bottlenecks. Where do tasks stall? Is it waiting for feedback, searching for files, or context-switching between tools? Each bottleneck is an opportunity for improvement.",
            "Automate the repetitive. If you find yourself doing the same sequence of actions more than three times a week, it's a candidate for automation. Use templates for recurring documents, set up email filters, create keyboard shortcuts, and leverage task management tools that can auto-assign and auto-sequence work.",
            "Design for context preservation. One of the biggest workflow killers is losing context when you switch tasks. Before stepping away from a task, jot down a quick note about where you left off and what the next step is. When you return, you can resume immediately instead of spending 10 minutes figuring out where you were.",
            "Build buffers into your schedule. Workflows that are packed end-to-end with no slack time are brittle — one delay cascades into everything else. Aim for 70-80% capacity utilization, leaving room for unexpected tasks, creative thinking, and recovery.",
            "Finally, iterate. No workflow is perfect on the first try. Review your system every month, ask what's working and what isn't, and make small adjustments. The best workflow is the one that evolves with you."
        ],
    },
    {
        title: "The Power of Deep Work in a Distracted World",
        excerpt:
            "Understand the concept of deep work and how it can help you achieve more in less time while maintaining quality.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80",
        author: "David Thompson",
        date: "March 8, 2024",
        category: "Productivity",
        featured: false,
        content: [
            "Cal Newport coined the term 'deep work' to describe professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limits. This type of work creates new value, improves your skills, and is hard to replicate.",
            "The opposite — 'shallow work' — includes logistical tasks like answering emails, attending status meetings, and filling out forms. While necessary, shallow work doesn't create lasting value and can usually be performed by anyone with minimal training.",
            "The challenge is that our modern work environment is engineered for shallow work. Open offices, instant messaging, always-on email, and social media create a constant stream of interruptions that make sustained focus nearly impossible. Yet deep work is precisely where the most valuable contributions happen.",
            "To cultivate a deep work practice, start by scheduling dedicated blocks of time — ideally 90 minutes to 2 hours — where you eliminate all distractions. Close your email, silence your phone, put on headphones, and tell colleagues you're unavailable. Treat these blocks as non-negotiable appointments with yourself.",
            "Location matters. If possible, find a quiet space away from your usual desk. Libraries, private rooms, or even a different coffee shop can help your brain enter 'focus mode' by breaking the association with your distraction-filled normal workspace.",
            "Track your deep work hours. Newport recommends keeping a simple tally of how many hours of genuine deep work you complete each day. Most knowledge workers are shocked to find they manage only 1-2 hours despite working 8+ hours. The goal is to gradually increase this number.",
            "The payoff is enormous. People who regularly practice deep work report producing higher quality output in less total time, experiencing greater job satisfaction, and feeling less stressed — because they know they're making meaningful progress on work that truly matters.",
            "Deep work isn't about working more hours. It's about spending more of your existing hours in a high-value state. Even adding one additional hour of deep work per day can transform your productivity and career trajectory."
        ],
    },
    {
        title: "How to Overcome Procrastination: A Practical Guide",
        excerpt:
            "Discover effective strategies to overcome procrastination and develop a more proactive approach to your tasks.",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1476&q=80",
        author: "Lisa Martinez",
        date: "March 5, 2024",
        category: "Psychology",
        featured: false,
        content: [
            "Procrastination isn't laziness — it's an emotional regulation problem. Research by Dr. Tim Pychyl at Carleton University shows that we procrastinate not because we can't manage time, but because we can't manage the negative emotions (boredom, anxiety, frustration) associated with a task.",
            "Understanding this changes everything. Instead of beating yourself up for procrastinating (which only makes the negative emotions worse), you can address the root cause directly.",
            "Strategy 1: The 5-Minute Start. Tell yourself you'll work on the dreaded task for just five minutes. This tiny commitment reduces the emotional barrier to starting. Once you're in motion, continuing is much easier than starting — a phenomenon psychologists call 'task momentum.'",
            "Strategy 2: Break It Down. Large, ambiguous tasks trigger anxiety because the brain can't easily visualize the path to completion. Break every project into concrete next actions that take 30 minutes or less. 'Write research paper' becomes 'Find three sources for section one' — suddenly manageable.",
            "Strategy 3: Remove Friction. Make the desired behavior as easy as possible. If you want to write every morning, open your document the night before and place your cursor at the stopping point. If you want to exercise, lay out your workout clothes. Reduce the distance between intention and action.",
            "Strategy 4: Implementation Intentions. Research shows that people who create specific 'if-then' plans are significantly more likely to follow through. Instead of 'I'll work on the presentation sometime today,' say 'When I sit down after lunch, I will open the presentation and add three slides.'",
            "Strategy 5: Forgive Yourself Quickly. Studies by Pychyl found that students who forgave themselves for procrastinating on studying for a first exam were less likely to procrastinate on the next one. Self-compassion breaks the shame-avoidance-more procrastination cycle.",
            "The goal isn't to eliminate procrastination entirely — that's unrealistic. The goal is to notice it sooner, understand what emotion is driving it, and have a toolkit of strategies to get yourself moving again."
        ],
    },
    {
        title: "The Role of Breaks in Maintaining Productivity",
        excerpt:
            "Learn why taking regular breaks is essential for maintaining high productivity and how to optimize your break times.",
        image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1364&q=80",
        author: "James Wilson",
        date: "March 3, 2024",
        category: "Wellness",
        featured: false,
        content: [
            "Counterintuitively, the secret to getting more done is to stop working more often. Research consistently shows that regular breaks improve focus, creativity, and overall output compared to powering through without rest.",
            "The science is clear: the brain operates in cycles of approximately 90 minutes, known as ultradian rhythms. After 90 minutes of focused work, neural activity naturally dips, attention wanders, and error rates increase. Fighting through this dip doesn't demonstrate discipline — it just produces lower quality work.",
            "A study from the Draugiem Group used time-tracking software to analyze the habits of their most productive employees. The top performers worked in focused sprints of approximately 52 minutes followed by 17-minute breaks. During breaks, they completely disconnected from work — no checking email, no 'quick' Slack messages.",
            "Not all breaks are equal. The most restorative breaks involve physical movement (a short walk), nature exposure (even looking at trees through a window helps), and social connection (a brief conversation with a friend). Scrolling social media during a break, on the other hand, doesn't recharge attention — it depletes it further.",
            "Micro-breaks matter too. Taking just 30-60 seconds to look away from your screen, stretch, or take a few deep breaths every 20 minutes can prevent the eye strain, muscle tension, and mental fatigue that accumulate over hours of continuous screen work.",
            "The lunch break deserves special protection. Eating at your desk while working is one of the most common and counterproductive habits in modern work culture. A proper lunch break — ideally away from your workspace — provides a cognitive reset that powers better afternoon performance.",
            "If you feel guilty about taking breaks, reframe them: breaks aren't time away from productivity. They're an investment in higher quality attention for the work that follows. The goal isn't to minimize rest — it's to optimize the cycle of work and recovery for sustained peak performance."
        ],
    },
    {
        title: "Building a Productive Morning Routine",
        excerpt:
            "Learn how to create a morning routine that sets you up for success and helps you maintain high energy throughout the day.",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1364&q=80",
        author: "Emma Wilson",
        date: "March 10, 2024",
        category: "Lifestyle",
        featured: false,
        content: [
            "How you start your morning shapes the trajectory of your entire day. A thoughtfully designed morning routine isn't about rigid discipline — it's about giving yourself the best possible launchpad for focused, energized work.",
            "The foundation is consistent wake time. Your circadian rhythm — the internal clock that regulates sleep, alertness, and hormone production — thrives on consistency. Waking at roughly the same time every day (yes, including weekends) trains your body to feel alert and ready at that hour.",
            "Resist the phone. The first 30-60 minutes after waking are when your brain transitions from sleep-mode theta waves to alert-mode alpha and beta waves. Immediately checking email or social media hijacks this transition by flooding your brain with other people's priorities and dopamine-triggering stimuli.",
            "Instead, invest the first hour in yourself. A productive morning routine typically includes some combination of: movement (even 10-15 minutes of stretching or a short walk), hydration (a large glass of water reverses overnight dehydration), and intention-setting (reviewing your top 3 priorities for the day).",
            "Journaling for 5-10 minutes can dramatically improve mental clarity. Write about what you're grateful for, what you intend to accomplish, or simply stream-of-consciousness thoughts. This practice helps 'empty the mental inbox' so you can approach work with a clear mind.",
            "Caffeine timing matters more than most people realize. Sleep researcher Dr. Matthew Walker recommends waiting 90-120 minutes after waking before consuming caffeine. In the first hours after waking, cortisol (a natural alertness hormone) is already elevated. Adding caffeine on top of high cortisol produces jitteriness rather than calm focus, and it can disrupt sleep that night.",
            "Finally, protect your morning routine fiercely. Don't schedule meetings before 10 AM if possible. Don't open email first thing. Your morning hours are when your prefrontal cortex is freshest and most capable of deep, creative work. Treat them as sacred.",
            "A morning routine doesn't need to be elaborate. Even 30 minutes of intentional morning time — movement, hydration, and reviewing your priorities — can noticeably improve your focus, mood, and productivity for the rest of the day."
        ],
    },
];

const focusTopics = [
    "Deep Work",
    "Habit Building",
    "Time Blocking",
    "Mindfulness",
    "Remote Work",
    "Team Productivity",
];

const heroLeftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.85rem",
};

const heroContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
};

const heroBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--color-primary-600)",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.06))",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    width: "fit-content",
};

const heroSubtitleStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.7,
    maxWidth: "34rem",
};

const heroActionsStyle = {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
};

const heroPrimaryButtonStyle = {
    background: "linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))",
    color: "#0f172a",
    padding: "0.85rem 1.9rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "0 16px 32px rgba(8, 145, 178, 0.28)",
    cursor: "pointer",
};

const heroSecondaryButtonStyle = {
    background: "transparent",
    color: "var(--color-primary-600)",
    padding: "0.85rem 1.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "1px solid var(--color-primary-300)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
};

const sectionHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
};

const sectionTitleStyle = {
    fontSize: "1.65rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
};

const topicsPanelStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const topicCardStyle = {
    background: "var(--color-white)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    boxShadow: "var(--shadow-soft)",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "var(--color-gray-700)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
};

const articlesSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
};

const postContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "1.5rem",
    gap: "0.85rem",
};

const postTextGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
};

const postTitleStyle = {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
    lineHeight: 1.3,
};

const postSummaryStyle = {
    fontSize: "0.95rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
};

const featuredImageStyle = {
    width: "100%",
    height: "100%",
    minHeight: "18rem",
    objectFit: "cover",
};

const featuredContentStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const postCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: "translateY(0)",
};

const postCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const postImageStyle = {
    width: "100%",
    height: "12rem",
    objectFit: "cover",
};

const postMetaHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "var(--color-gray-500)",
};

const postFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "1rem",
    borderTop: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
};

const tagStyle = {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--color-primary-600)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-primary-600)",
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    transition: "color 0.2s ease, transform 0.2s ease",
};

const readMoreHoverStyle = {
    color: "var(--color-primary-700)",
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.02)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.05)",
};

const topicCardHoverStyle = {
    ...topicCardStyle,
    borderColor: "var(--color-primary-300)",
    transform: "translateY(-2px)",
};

/* ── Article View Styles ────────────────────── */
const articleViewWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
};

const articleHeroImageStyle = {
    width: "100%",
    maxHeight: "24rem",
    objectFit: "cover",
    borderRadius: "1.25rem",
    boxShadow: "var(--shadow-lg)",
};

const articleBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const articleParagraphStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.8,
    margin: 0,
};

const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-primary-600)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textDecoration: "none",
    transition: "color 0.2s ease, transform 0.2s ease",
};

const articleMetaBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
};

const DashboardBlog = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [topicHovered, setTopicHovered] = useState(null);
    const [cardHovered, setCardHovered] = useState(null);
    const [readingButtonHovered, setReadingButtonHovered] = useState(false);
    const [backHovered, setBackHovered] = useState(false);
    const [featuredReadMoreHovered, setFeaturedReadMoreHovered] = useState(false);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [activeArticle, setActiveArticle] = useState(null);

    const isExtraSmall = width < 400;

    const pageWrapperStyle = {
        minHeight: "100vh",
        padding: isExtraSmall ? "2rem 0.75rem 5rem" : isMobile ? "2rem 1.25rem 5rem" : "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        overflowX: "hidden",
    };

    const containerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "2rem" : "3.5rem",
    };

    const heroSectionStyle = {
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: isMobile ? "2rem" : "3rem",
        background: "var(--panel-bg)",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.75rem" : "3rem",
        boxShadow: "var(--shadow-lg)",
    };

    const heroTitleStyle = {
        fontSize: isExtraSmall ? "1.75rem" : isMobile ? "2rem" : "3rem",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
        color: "var(--color-gray-900)",
    };

    const topicsBarStyle = {
        display: "grid",
        gridTemplateColumns: isExtraSmall ? "1fr" : "1fr 1fr",
        gap: "0.75rem",
    };

    const articleGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: isMobile ? "1.5rem" : "2rem",
    };

    const featuredPostStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        background: "var(--panel-bg)",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "var(--shadow-lg)",
    };

    const articleTitleStyle = {
        fontSize: isExtraSmall ? "1.5rem" : isMobile ? "1.75rem" : "2.2rem",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        color: "var(--color-gray-900)",
    };

    const featuredPost = posts.find((p) => p.featured);
    const regularPosts = posts.filter((p) => !p.featured);

    const handleReadArticle = (post) => {
        setActiveArticle(post);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveArticle(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ── Article Reading View ──
    if (activeArticle) {
        return (
            <div style={pageWrapperStyle}>
                <div style={containerStyle}>
                    <div style={articleViewWrapperStyle}>
                        <button
                            onClick={handleBack}
                            onMouseEnter={() => setBackHovered(true)}
                            onMouseLeave={() => setBackHovered(false)}
                            style={backHovered ? { ...backButtonStyle, ...readMoreHoverStyle } : backButtonStyle}
                        >
                            <FaArrowLeft style={{
                                fontSize: "0.85rem",
                                transition: "transform 0.2s ease",
                                transform: backHovered ? "translateX(-4px)" : "translateX(0)"
                            }} />
                            Back to all articles
                        </button>

                        <img
                            src={activeArticle.image}
                            alt=""
                            style={{
                                ...articleHeroImageStyle,
                                maxHeight: isMobile ? "16rem" : "24rem",
                                borderRadius: isMobile ? "1rem" : "1.25rem",
                            }}
                        />

                        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "0.75rem" : "1rem" }}>
                            <div style={articleMetaBarStyle}>
                                <span style={{
                                    ...tagStyle,
                                    background: "rgba(56, 189, 248, 0.12)",
                                    padding: "0.3rem 0.75rem",
                                    borderRadius: "999px",
                                    fontSize: isMobile ? "0.7rem" : "0.75rem",
                                }}>
                                    {activeArticle.category}
                                </span>
                                <span style={{ fontSize: isMobile ? "0.8rem" : "0.85rem", color: "var(--color-gray-500)" }}>
                                    {activeArticle.author}
                                </span>
                                <span style={{ fontSize: "0.85rem", color: "var(--color-gray-400)" }}>•</span>
                                <span style={{ fontSize: isMobile ? "0.8rem" : "0.85rem", color: "var(--color-gray-500)" }}>
                                    {activeArticle.date}
                                </span>
                            </div>
                            <h1 style={{
                                ...articleTitleStyle,
                                fontSize: isExtraSmall ? "1.45rem" : isMobile ? "1.65rem" : "2.2rem"
                            }}>
                                {activeArticle.title}
                            </h1>
                        </div>

                        <div style={{ ...articleBodyStyle, gap: isMobile ? "1rem" : "1.25rem" }}>
                            {activeArticle.content.map((paragraph, i) => (
                                <p key={i} style={{
                                    ...articleParagraphStyle,
                                    fontSize: isMobile ? "0.95rem" : "1.05rem",
                                    lineHeight: isMobile ? 1.7 : 1.8
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div style={{
                            borderTop: "1px solid color-mix(in srgb, var(--panel-bg) 88%, black 12%)",
                            paddingTop: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? "1.05rem" : "1.1rem",
                                fontWeight: 700,
                                color: "var(--color-gray-700)",
                                margin: 0,
                            }}>
                                Enjoyed this article?
                            </h3>
                            <p style={{
                                fontSize: isMobile ? "0.9rem" : "0.95rem",
                                color: "var(--color-gray-500)",
                                lineHeight: 1.6,
                                margin: 0,
                            }}>
                                Explore more insights on focus, productivity, and workflow design in the FocusFlow blog.
                            </p>
                            <button
                                onClick={handleBack}
                                onMouseEnter={() => setReadingButtonHovered(true)}
                                onMouseLeave={() => setReadingButtonHovered(false)}
                                style={{
                                    ...(readingButtonHovered ? heroPrimaryButtonHoverStyle : heroPrimaryButtonStyle),
                                    alignSelf: "flex-start",
                                    width: isExtraSmall ? "100%" : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <FaBookOpen style={{ fontSize: "0.9rem" }} />
                                Browse more articles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Blog Listing View ──
    return (
        <div style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaBookOpen style={{ width: "0.9rem" }} />
                                Community Blog
                            </span>
                            <h1 style={heroTitleStyle}>Insights for deep work</h1>
                            <p style={heroSubtitleStyle}>
                                Discover strategies, research, and stories to help you master focus, manage time, and build lasting habits in your daily life.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#featured"
                                style={primaryButtonHovered ? heroPrimaryButtonHoverStyle : heroPrimaryButtonStyle}
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Start reading
                            </a>
                            <a
                                href="#topics"
                                style={secondaryButtonHovered ? heroSecondaryButtonHoverStyle : heroSecondaryButtonStyle}
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Browse topics
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle} id="topics">
                        <div style={topicsPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Popular Topics</h2>
                                <p style={{ fontSize: "0.9rem", color: "var(--color-gray-500)", margin: 0 }}>What focusers are talking about</p>
                            </div>
                            <div style={topicsBarStyle}>
                                {focusTopics.map((topic, i) => (
                                    <div
                                        key={topic}
                                        style={topicHovered === i ? topicCardHoverStyle : topicCardStyle}
                                        onMouseEnter={() => setTopicHovered(i)}
                                        onMouseLeave={() => setTopicHovered(null)}
                                    >
                                        <FaCheckCircle style={{ color: "var(--color-primary-600)", width: "0.9rem" }} />
                                        <span>{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={articlesSectionStyle} id="featured">
                    <div style={sectionHeaderStyle}>
                        <h2 style={sectionTitleStyle}>Featured Story</h2>
                    </div>

                    {featuredPost && (
                        <div style={featuredPostStyle}>
                            <img src={featuredPost.image} alt="" style={featuredImageStyle} />
                            <div style={featuredContentStyle}>
                                <div style={postMetaHeaderStyle}>
                                    <span>{featuredPost.author}</span>
                                    <span>•</span>
                                    <span>{featuredPost.date}</span>
                                </div>
                                <div style={postTextGroupStyle}>
                                    <h2 style={{ ...postTitleStyle, fontSize: isMobile ? "1.5rem" : "1.85rem" }}>{featuredPost.title}</h2>
                                    <p style={postSummaryStyle}>{featuredPost.excerpt}</p>
                                </div>
                                <div style={postFooterStyle}>
                                    <span style={tagStyle}>{featuredPost.category}</span>
                                    <button
                                        onClick={() => handleReadArticle(featuredPost)}
                                        onMouseEnter={() => setFeaturedReadMoreHovered(true)}
                                        onMouseLeave={() => setFeaturedReadMoreHovered(false)}
                                        style={featuredReadMoreHovered ? { ...readMoreStyle, ...readMoreHoverStyle } : readMoreStyle}
                                    >
                                        Read article
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                transition: "transform 0.2s ease",
                                                transform: featuredReadMoreHovered ? "translateX(4px)" : "translateX(0)"
                                            }}
                                        >
                                            <path d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={articleGridStyle}>
                        {regularPosts.map((post) => (
                            <div
                                key={post.title}
                                style={
                                    cardHovered === post.title
                                        ? { ...postCardStyle, ...postCardHoverStyle }
                                        : postCardStyle
                                }
                                onMouseEnter={() => setCardHovered(post.title)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                <img src={post.image} alt="" style={postImageStyle} />
                                <div style={postContentStyle}>
                                    <div style={postMetaHeaderStyle}>
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <div style={postTextGroupStyle}>
                                        <h3 style={postTitleStyle}>{post.title}</h3>
                                        <p style={postSummaryStyle}>{post.excerpt}</p>
                                    </div>
                                    <div style={postFooterStyle}>
                                        <span style={tagStyle}>{post.category}</span>
                                        <button
                                            onClick={() => handleReadArticle(post)}
                                            onMouseEnter={() => setReadMoreHovered({ ...readMoreHovered, [post.title]: true })}
                                            onMouseLeave={() => setReadMoreHovered({ ...readMoreHovered, [post.title]: false })}
                                            style={readMoreHovered[post.title] ? { ...readMoreStyle, ...readMoreHoverStyle } : readMoreStyle}
                                        >
                                            Read more
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{
                                                    marginLeft: "0.2rem",
                                                    transition: "transform 0.2s ease",
                                                    transform: readMoreHovered[post.title] ? "translateX(3px)" : "translateX(0)"
                                                }}
                                            >
                                                <path d="M5 12h14m-7-7 7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardBlog;
