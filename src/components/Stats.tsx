import { useEffect, useState } from "react";
import { ChartBarIcon, ClockIcon, FireIcon } from "@heroicons/react/24/solid";
import type { CSSProperties } from "react";

interface Distraction {
    id: string;
    timestamp: string;
    note: string;
}

interface StatsProps {
    distractions: Distraction[];
}

const Stats: React.FC<StatsProps> = ({ distractions }) => {
    const [commonDistractions, setCommonDistractions] = useState<
        [string, number][]
    >([]);
    const [currentStreak, setCurrentStreak] = useState(0);

    useEffect(() => {
        // Calculate common distractions
        const distractionCounts = distractions.reduce((acc, { note }) => {
            acc[note] = (acc[note] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const sortedDistractions = Object.entries(distractionCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        setCommonDistractions(sortedDistractions);

        // Calculate current streak
        const today = new Date().toISOString().split("T")[0];
        const sortedByDate = [...distractions].sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        );

        let streak = 0;
        let currentDate = today;

        for (const distraction of sortedByDate) {
            const distractionDate = distraction.timestamp.split("T")[0];
            if (distractionDate === currentDate) {
                streak++;
            } else {
                break;
            }
        }

        setCurrentStreak(streak);
    }, [distractions]);

    const containerStyle: CSSProperties = {
        backgroundColor: "var(--color-white)",
        borderRadius: "1rem",
        boxShadow: "var(--shadow-soft)",
        padding: "2rem",
        borderLeft: "4px solid var(--color-primary-400)",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        transition: "all 300ms ease-in-out",
    };

    const headingStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-800)",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
    };

    const contentWrapperStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    };

    const streakCardStyle: CSSProperties = {
        background:
            "linear-gradient(to bottom right, var(--color-secondary-50), var(--color-secondary-100))",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        transition: "all 300ms ease-in-out",
    };

    const streakCardHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
    };

    const streakCardHeaderLeftStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const streakCardHeadingStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-700)",
    };

    const streakCardValueStyle: CSSProperties = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-secondary-500)",
        animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    };

    const streakCardFooterStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
    };

    const sectionHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const sectionHeadingStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-700)",
    };

    const distractionListStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const distractionItemStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--color-gray-50)",
        padding: "1rem",
        borderRadius: "0.75rem",
        transition: "all 300ms ease-in-out",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
    };

    const distractionItemLeftStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const distractionItemNumberStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        borderRadius: "9999px",
        backgroundColor: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-600)",
        fontWeight: 700,
    };

    const distractionItemNoteStyle: CSSProperties = {
        color: "var(--color-gray-600)",
        fontWeight: 500,
        transition: "colors 300ms ease-in-out",
    };

    const distractionItemRightStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const distractionItemCountStyle: CSSProperties = {
        color: "var(--color-primary-500)",
        fontWeight: 700,
        fontSize: "1.125rem",
    };

    const distractionItemTimesLabelStyle: CSSProperties = {
        color: "var(--color-gray-400)",
        fontSize: "0.875rem",
    };

    const noDistractionsMessageStyle: CSSProperties = {
        textAlign: "center",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        color: "var(--color-gray-500)",
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>
                <ChartBarIcon style={headingStyle} />
                Statistics
            </h2>

            <div style={contentWrapperStyle}>
                {/* Streak Card */}
                <div style={streakCardStyle}>
                    <div style={streakCardHeaderStyle}>
                        <div style={streakCardHeaderLeftStyle}>
                            <FireIcon
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    color: "var(--color-secondary-500)",
                                }}
                            />
                            <h3 style={streakCardHeadingStyle}>
                                Current Streak
                            </h3>
                        </div>
                        <div style={streakCardValueStyle}>{currentStreak}</div>
                    </div>
                    <div style={streakCardFooterStyle}>
                        {currentStreak === 1 ? "day" : "days"} of focused work
                    </div>
                </div>

                {/* Common Distractions */}
                <div>
                    <div style={sectionHeaderStyle}>
                        <ClockIcon
                            style={{
                                height: "1.5rem",
                                width: "1.5rem",
                                color: "var(--color-primary-500)",
                            }}
                        />
                        <h3 style={sectionHeadingStyle}>Common Distractions</h3>
                    </div>
                    <div style={distractionListStyle}>
                        {commonDistractions.map(([note, count], index) => (
                            <div key={note} style={distractionItemStyle}>
                                <div style={distractionItemLeftStyle}>
                                    <div style={distractionItemNumberStyle}>
                                        {index + 1}
                                    </div>
                                    <span style={distractionItemNoteStyle}>
                                        {note}
                                    </span>
                                </div>
                                <div style={distractionItemRightStyle}>
                                    <span style={distractionItemCountStyle}>
                                        {count}
                                    </span>
                                    <span
                                        style={distractionItemTimesLabelStyle}
                                    >
                                        times
                                    </span>
                                </div>
                            </div>
                        ))}
                        {commonDistractions.length === 0 && (
                            <div style={noDistractionsMessageStyle}>
                                No distractions logged yet. Keep up the good
                                work! 🎉
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
