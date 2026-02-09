/**
 * Community Events Data and Logic
 * 12 unique events rotating in groups of 3 based on user's account age
 */

const COMMUNITY_EVENTS = [
    // Day 1 (Index 0): High-Intensity Focus
    {
        id: "blackout-sprint",
        title: "The Blackout Sprint",
        description: "90 minutes of zero-internet, total-darkness focus. Offline tasks only. No distractions, no excuses—just pure, uninterrupted deep work.",
        badge: "High Intensity",
        action: "Join the sprint",
        category: "intensity",
        duration: "90 min",
        icon: "🌑"
    },
    {
        id: "big-frog-hunt",
        title: "The Big Frog Hunt",
        description: "Based on 'Eat that Frog'—tackle your most dreaded, boring task right now. We all do it together, making the impossible feel achievable.",
        badge: "High Intensity",
        action: "Start hunting",
        category: "intensity",
        duration: "60 min",
        icon: "🐸"
    },
    {
        id: "50-10-push",
        title: "The 50/10 Push",
        description: "Intense 50-minute focus blocks followed by mandatory 10-minute active movement breaks. High-energy rhythm for peak performance.",
        badge: "High Intensity",
        action: "Join the push",
        category: "intensity",
        duration: "2 hours",
        icon: "⚡"
    },

    // Day 2 (Index 1): Foundation & Mindset
    {
        id: "3-item-sync",
        title: "The 3-Item Sync",
        description: "Publicly commit to and lock in your top 3 non-negotiables for the day. Simple, focused, and powerful morning accountability.",
        badge: "Daily Ritual",
        action: "Commit now",
        category: "foundation",
        duration: "15 min",
        icon: "🎯"
    },
    {
        id: "dopamine-reset",
        title: "Dopamine Reset",
        description: "10 minutes of total silence and no screens before starting work. Reset your brain's reward system and reclaim natural focus.",
        badge: "Mindfulness",
        action: "Start reset",
        category: "wellbeing",
        duration: "10 min",
        icon: "🧘"
    },
    {
        id: "streak-celebration",
        title: "Streak Celebration",
        description: "Honor members hitting 7, 30, or 100-day focus streaks with special recognition, badges, and community applause.",
        badge: "Community",
        action: "View winners",
        category: "social",
        duration: "30 min",
        icon: "🏆"
    },

    // Day 3 (Index 2): Planning & Systems
    {
        id: "weekly-blueprinting",
        title: "Weekly Blueprinting",
        description: "A Sunday ritual to map out your entire week's priorities. Plan your week like a pro and enter Monday with total clarity.",
        badge: "Planning",
        action: "Start planning",
        category: "planning",
        duration: "45 min",
        icon: "📐"
    },
    {
        id: "stop-doing-workshop",
        title: "The 'Stop Doing' Workshop",
        description: "Identify three habits or tasks you're officially quitting. Sometimes progress means cutting what's holding you back.",
        badge: "Workshop",
        action: "Join workshop",
        category: "planning",
        duration: "40 min",
        icon: "🛑"
    },
    {
        id: "visual-mapping",
        title: "Visual Mapping Party",
        description: "Create mind maps for complex goals instead of boring lists. Visual thinking unlocks creativity and clarity.",
        badge: "Creative",
        action: "Start mapping",
        category: "experimental",
        duration: "50 min",
        icon: "🗺️"
    },

    // Day 4 (Index 3): Growth & Optimization
    {
        id: "1-percent-lab",
        title: "The 1% Lab",
        description: "Choose one tiny habit change to implement and track for 7 days. Small improvements compound into massive results.",
        badge: "Habit Building",
        action: "Pick your 1%",
        category: "experimental",
        duration: "30 min",
        icon: "🧬"
    },
    {
        id: "browser-pruning",
        title: "Browser Pruning",
        description: "Group session to delete unneeded bookmarks, tabs, and extensions. Digital decluttering for mental clarity.",
        badge: "Optimization",
        action: "Start pruning",
        category: "environment",
        duration: "35 min",
        icon: "🌿"
    },
    {
        id: "ai-for-focus",
        title: "AI for Focus",
        description: "Workshop on using AI tools to summarize notes, automate tasks, and save precious focus time. Work smarter, not harder.",
        badge: "Workshop",
        action: "Learn AI tools",
        category: "environment",
        duration: "60 min",
        icon: "🤖"
    }
];

/**
 * Calculate which day of the 4-day cycle the user is on
 * @param {Date} createdAt - User's account creation date
 * @returns {number} - Cycle index (0-3)
 */
const getCycleIndex = (createdAt) => {
    const now = new Date();
    const accountCreation = new Date(createdAt);
    const daysSinceCreation = Math.floor((now - accountCreation) / (1000 * 60 * 60 * 24));
    return daysSinceCreation % 4;
};

/**
 * Get 3 events for a specific user based on their account age
 * @param {Date} userCreatedAt - User's account creation date
 * @returns {Array} - Array of 3 events with calculated dates
 */
const getEventsForUser = (userCreatedAt) => {
    const cycleIndex = getCycleIndex(userCreatedAt);
    const startIndex = cycleIndex * 3;
    const userEvents = COMMUNITY_EVENTS.slice(startIndex, startIndex + 3);

    // Add dynamic dates (today, tomorrow, day after)
    const now = new Date();
    return userEvents.map((event, idx) => {
        const eventDate = new Date(now);
        eventDate.setDate(eventDate.getDate() + idx);

        const timeOptions = [
            { hour: 18, minute: 0, label: "6 PM" },
            { hour: 8, minute: 0, label: "8 AM" },
            { hour: 16, minute: 0, label: "4 PM" }
        ];

        const timeSlot = timeOptions[idx];
        eventDate.setHours(timeSlot.hour, timeSlot.minute, 0, 0);

        return {
            ...event,
            date: eventDate,
            dateFormatted: `${eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${timeSlot.label} GMT`,
            timestamp: eventDate.getTime()
        };
    });
};

/**
 * Get the full event catalog
 * @returns {Array} - All 12 events
 */
const getAllEvents = () => {
    return COMMUNITY_EVENTS;
};

export { getEventsForUser, getAllEvents, getCycleIndex, COMMUNITY_EVENTS };
