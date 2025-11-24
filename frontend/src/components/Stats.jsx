import {
    ChartBarIcon,
    ClockIcon,
    BellAlertIcon,
} from "@heroicons/react/24/outline";

export default function Stats({ distractions = [] }) {
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
        }, {});
        const entries = Object.entries(counts);
        if (entries.length === 0) return "None";
        const maxType = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
        return maxType[0] || "None";
    };

    return (
        <div className="stats-container">
            <div className="stats-header">
                <h2>Focus Statistics</h2>
                <p>Track your progress and identify patterns</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <ChartBarIcon className="stat-icon" />
                    <div className="stat-value">{totalDistractions}</div>
                    <div className="stat-label">Total Distractions</div>
                </div>

                <div className="stat-card">
                    <ClockIcon className="stat-icon" />
                    <div className="stat-value">{todayDistractions}</div>
                    <div className="stat-label">Today's Distractions</div>
                </div>

                <div className="stat-card">
                    <BellAlertIcon className="stat-icon" />
                    <div className="stat-value">{getMostCommonType()}</div>
                    <div className="stat-label">Most Common Type</div>
                </div>

                <div className="stat-card">
                    <ClockIcon className="stat-icon" />
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
                <h3>Distraction Trends</h3>
                <p>Chart visualization coming soon</p>
            </div>
        </div>
    );
}
