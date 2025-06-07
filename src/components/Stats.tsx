import {
    ChartBarIcon,
    ClockIcon,
    BellAlertIcon,
} from "@heroicons/react/24/outline";

interface Distraction {
    id: string;
    timestamp: string;
    note: string;
    type: string;
    time: string;
}

interface StatsProps {
    distractions: Distraction[];
}

export default function Stats({ distractions }: StatsProps) {
    const totalDistractions = distractions.length;
    const todayDistractions = distractions.filter(
        (d) =>
            new Date(d.timestamp).toDateString() === new Date().toDateString()
    ).length;

    const getMostCommonType = () => {
        const types = distractions.map((d) => d.type);
        const counts = types.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const maxType = Object.entries(counts).reduce((a, b) =>
            a[1] > b[1] ? a : b
        );
        return maxType[0] || "None";
    };

    return (
        <div className="stats-container">
            <div className="stats-header">
                <h2 className="stats-title">Focus Statistics</h2>
                <p className="stats-subtitle">
                    Track your progress and identify patterns
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-value">{totalDistractions}</div>
                    <div className="stat-label">Total Distractions</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{todayDistractions}</div>
                    <div className="stat-label">Today's Distractions</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{getMostCommonType()}</div>
                    <div className="stat-label">Most Common Type</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">
                        {distractions.length > 0
                            ? new Date(
                                  distractions[
                                      distractions.length - 1
                                  ].timestamp
                              ).toLocaleTimeString()
                            : "N/A"}
                    </div>
                    <div className="stat-label">Last Distraction</div>
                </div>
            </div>

            <div className="stats-chart">
                <h3 className="chart-title">Distraction Trends</h3>
                <div className="chart-placeholder">
                    Chart visualization coming soon
                </div>
            </div>
        </div>
    );
}
