import { useEffect, useState } from "react";
import { ChartBarIcon, ClockIcon, FireIcon } from "@heroicons/react/24/solid";
import "./Stats.css"; // Import the new Stats.css file

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

    return (
        <div className="stats-container">
            <h2 className="stats-heading">
                <ChartBarIcon />
                Statistics
            </h2>

            <div className="stats-content-wrapper">
                {/* Streak Card */}
                <div className="streak-card">
                    <div className="streak-card-header">
                        <div className="streak-card-header-left">
                            <FireIcon />
                            <h3 className="streak-card-heading">
                                Current Streak
                            </h3>
                        </div>
                        <div className="streak-card-value">{currentStreak}</div>
                    </div>
                    <div className="streak-card-footer">
                        {currentStreak === 1 ? "day" : "days"} of focused work
                    </div>
                </div>

                {/* Common Distractions */}
                <div>
                    <div className="common-distractions-section-header">
                        <ClockIcon />
                        <h3 className="common-distractions-section-heading">
                            Common Distractions
                        </h3>
                    </div>
                    <div className="distraction-list">
                        {commonDistractions.map(([note, count], index) => (
                            <div key={note} className="distraction-item">
                                <div className="distraction-item-left">
                                    <div className="distraction-item-number">
                                        {index + 1}
                                    </div>
                                    <span className="distraction-item-note">
                                        {note}
                                    </span>
                                </div>
                                <div className="distraction-item-right">
                                    <span className="distraction-item-count">
                                        {count}
                                    </span>
                                    <span className="distraction-item-times-label">
                                        times
                                    </span>
                                </div>
                            </div>
                        ))}
                        {commonDistractions.length === 0 && (
                            <div className="no-distractions-message">
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
