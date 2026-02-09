/**
 * Community Events Preview Tool
 * Run this script to see which events would be shown for different account ages
 */

const COMMUNITY_EVENTS = [
    // Day 1 - High Intensity
    { id: 1, title: "🌑 The Blackout Sprint", day: 1 },
    { id: 2, title: "🐸 The Big Frog Hunt", day: 1 },
    { id: 3, title: "⚡ The 50/10 Push", day: 1 },

    // Day 2 - Foundation & Mindset
    { id: 4, title: "🎯 The 3-Item Sync", day: 2 },
    { id: 5, title: "🧘 Dopamine Reset", day: 2 },
    { id: 6, title: "🏆 Streak Celebration", day: 2 },

    // Day 3 - Planning & Systems
    { id: 7, title: "📐 Weekly Blueprinting", day: 3 },
    { id: 8, title: "🛑 The 'Stop Doing' Workshop", day: 3 },
    { id: 9, title: "🗺️ Visual Mapping Party", day: 3 },

    // Day 4 - Growth & Optimization
    { id: 10, title: "🧬 The 1% Lab", day: 4 },
    { id: 11, title: "🌿 Browser Pruning", day: 4 },
    { id: 12, title: "🤖 AI for Focus", day: 4 }
];

function getEventsForDay(daysSinceCreation) {
    const cycleIndex = daysSinceCreation % 4;
    const startIndex = cycleIndex * 3;
    return COMMUNITY_EVENTS.slice(startIndex, startIndex + 3);
}

function printCalendar(startDay = 0, numDays = 16) {
    console.log("\n╔════════════════════════════════════════════════════════════════════╗");
    console.log("║          COMMUNITY EVENTS ROTATION CALENDAR                        ║");
    console.log("╚════════════════════════════════════════════════════════════════════╝\n");

    for (let i = startDay; i < startDay + numDays; i++) {
        const events = getEventsForDay(i);
        const cycleDay = (i % 4) + 1;
        const cycleNumber = Math.floor(i / 4) + 1;

        console.log(`┌─ Day ${i} (Cycle ${cycleNumber}, Day ${cycleDay}) ────────────────────────────────────┐`);
        events.forEach((event, idx) => {
            console.log(`│ ${idx + 1}. ${event.title.padEnd(50)} │`);
        });
        console.log(`└──────────────────────────────────────────────────────────────────┘\n`);
    }
}

// Example usage
console.log("\n🎯 COMMUNITY EVENTS ROTATION PREVIEW\n");
console.log("This shows what events a user would see based on their account age.\n");

// Show first 16 days (4 complete cycles)
printCalendar(0, 16);

console.log("\n📌 KEY INSIGHTS:");
console.log("   • The cycle repeats every 4 days");
console.log("   • Each user sees 3 unique events per day");
console.log("   • Different users see different events on the same calendar day");
console.log("   • Events are personalized to account creation date, not calendar date\n");

// Example scenarios
console.log("\n🔍 EXAMPLE SCENARIOS:\n");

console.log("Scenario 1: User created account TODAY");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
const scenario1 = getEventsForDay(0);
scenario1.forEach((e, i) => console.log(`  ${i + 1}. ${e.title}`));

console.log("\nScenario 2: User created account 5 DAYS AGO");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
const scenario2 = getEventsForDay(5);
scenario2.forEach((e, i) => console.log(`  ${i + 1}. ${e.title}`));

console.log("\nScenario 3: User created account 10 DAYS AGO");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
const scenario3 = getEventsForDay(10);
scenario3.forEach((e, i) => console.log(`  ${i + 1}. ${e.title}`));

console.log("\n✨ All events are shown with dynamic dates (Today, Tomorrow, etc.)");
console.log("✨ The cycle ensures fresh content every day for 4 days, then repeats\n");
