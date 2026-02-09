import { ChartBarIcon, ClockIcon, BellAlertIcon } from "@heroicons/react/24/outline";

const styles = {
    wrapper: {
        display: "grid",
        gap: "1.25rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        borderRadius: "1rem",
        padding: "1.25rem",
    },
    header: {
        display: "grid",
        gap: "0.35rem",
    },
    title: {
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    subtitle: {
        margin: 0,
        color: "var(--color-gray-600)",
        fontSize: "0.95rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "0.9rem",
    },
    card: {
        borderRadius: "0.9rem",
        border: "1px solid var(--input-border)",
        background: "var(--color-white)",
        padding: "1rem",
        display: "grid",
        gap: "0.4rem",
        boxShadow: "var(--shadow-soft)",
    },
    iconWrap: {
        width: "2.2rem",
        height: "2.2rem",
        borderRadius: "0.6rem",
        background: "rgba(56,189,248,0.16)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    value: {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    label: {
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "var(--color-gray-600)",
    },
    chart: {
        borderRadius: "0.9rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        padding: "1rem",
        boxShadow: "var(--shadow-soft)",
        display: "grid",
        gap: "0.6rem",
    },
    chartTitle: {
        margin: 0,
        fontSize: "1rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    chartNote: { margin: 0, color: "var(--color-gray-600)" },
    chartLegend: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
        alignItems: "center",
        color: "var(--color-gray-600)",
        fontSize: "0.78rem",
    },
    legendItem: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontWeight: 600,
    },
    legendSwatch: {
        width: "0.8rem",
        height: "0.8rem",
        borderRadius: "0.3rem",
    },
    trendWrap: {
        display: "flex",
        alignItems: "flex-end",
        gap: "1.1rem",
        minHeight: "160px",
        padding: "0.35rem 0",
    },
    trendColumn: {
        display: "grid",
        gap: "0.45rem",
        justifyItems: "center",
        flex: "0 0 auto",
    },
    trendStack: {
        width: "28px",
        borderRadius: "0.95rem",
        background: "color-mix(in srgb, var(--panel-bg) 70%, transparent)",
        border: "1px solid color-mix(in srgb, var(--input-border) 60%, transparent)",
        boxShadow: "0 10px 28px -22px rgba(14,165,233,0.55)",
        overflow: "hidden",
        display: "grid",
        alignContent: "end",
    },
    trendSegment: {
        width: "100%",
        transition: "height 0.25s ease",
    },
    trendEmpty: {
        width: "100%",
        height: "6px",
        background: "color-mix(in srgb, var(--input-border) 40%, transparent)",
    },
    trendLabel: {
        fontSize: "0.78rem",
        fontWeight: 600,
        color: "var(--color-gray-600)",
    },
    trendValue: {
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    },
};

export default function Stats({ distractions = [] }) {
    const totalDistractions = distractions.length;
    const todayDistractions = distractions.filter(
        (d) => new Date(d.timestamp).toDateString() === new Date().toDateString()
    ).length;

    const getMostCommonType = () => {
        const counts = distractions.reduce((acc, d) => {
            const t = d.type || "other";
            acc[t] = (acc[t] || 0) + 1;
            return acc;
        }, {});
        const entries = Object.entries(counts);
        if (entries.length === 0) return "None";
        return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0] || "None";
    };

    // Last 7 days trend
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        return d;
    });
    const fmtDay = (d) => d.toLocaleDateString(undefined, { weekday: "short" });
    const counts = days.map((d) => {
        const dayKey = d.toDateString();
        const entries = distractions.filter((x) => new Date(x.timestamp).toDateString() === dayKey);
        const severityBreakdown = entries.reduce(
            (acc, entry) => {
                const sev = (entry.severity || "medium").toLowerCase();
                if (acc[sev] !== undefined) acc[sev] += 1;
                else acc.medium += 1;
                return acc;
            },
            { high: 0, medium: 0, low: 0 }
        );
        return { total: entries.length, severity: severityBreakdown };
    });
    const totals = counts.map((c) => c.total);
    const max = Math.max(1, ...totals);
    const overallTotal = totals.reduce((acc, val) => acc + val, 0);
    const peakIndex = totals.findIndex((value) => value === Math.max(...totals));
    const peakDayLabel = overallTotal > 0 ? fmtDay(days[peakIndex]) : "—";
    const severityOrder = ["high", "medium", "low"];
    const severityPalette = {
        high: "var(--color-red-500)",
        medium: "var(--color-primary-500)",
        low: "var(--color-primary-300)",
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2 style={styles.title}>Focus Statistics</h2>
                <p style={styles.subtitle}>Track your progress and identify patterns</p>
            </div>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.iconWrap}>
                        <ChartBarIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                    </div>
                    <div style={styles.value}>{totalDistractions}</div>
                    <div style={styles.label}>Total Distractions</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.iconWrap}>
                        <ClockIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                    </div>
                    <div style={styles.value}>{todayDistractions}</div>
                    <div style={styles.label}>Today's Distractions</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.iconWrap}>
                        <BellAlertIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                    </div>
                    <div style={styles.value}>{getMostCommonType()}</div>
                    <div style={styles.label}>Most Common Type</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.iconWrap}>
                        <ClockIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                    </div>
                    <div style={styles.value}>
                        {distractions.length > 0
                            ? new Date(distractions[distractions.length - 1].timestamp).toLocaleTimeString()
                            : "N/A"}
                    </div>
                    <div style={styles.label}>Last Distraction</div>
                </div>
            </div>

            <div style={styles.chart}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <h3 style={styles.chartTitle}>Distraction Trends</h3>
                    <div style={styles.chartLegend}>
                        {severityOrder.map((sev) => (
                            <span key={sev} style={styles.legendItem}>
                                <span style={{ ...styles.legendSwatch, background: severityPalette[sev] }} />
                                {sev}
                            </span>
                        ))}
                    </div>
                </div>
                {overallTotal === 0 ? (
                    <p style={styles.chartNote}>Start logging distractions to see your 7-day trend.</p>
                ) : (
                    <>
                        <div style={styles.trendWrap} role="list" aria-label="Distractions per day with severity breakdown">
                            {counts.map((c, i) => {
                                const dayLabel = fmtDay(days[i]);
                                const isPeak = totals[i] === Math.max(...totals) && totals[i] > 0;
                                const scale = totals[i] > 0 ? Math.max((totals[i] / max) * 120, 16) : 0;
                                const totalForDay = totals[i];
                                const segments = severityOrder
                                    .filter((sev) => c.severity[sev] > 0)
                                    .map((sev) => ({
                                        sev,
                                        value: c.severity[sev],
                                        height: Math.max((c.severity[sev] / max) * 120, 8),
                                    }));
                                return (
                                    <div key={dayLabel} style={styles.trendColumn} role="listitem" aria-label={`${dayLabel}: ${totalForDay} distractions`}>
                                        <div
                                            style={{
                                                ...styles.trendStack,
                                                boxShadow: isPeak
                                                    ? "0 16px 40px -26px rgba(56,189,248,0.75)"
                                                    : styles.trendStack.boxShadow,
                                                borderColor: isPeak
                                                    ? "var(--color-primary-300)"
                                                    : styles.trendStack.border,
                                            }}
                                        >
                                            {totalForDay === 0 ? (
                                                <div style={styles.trendEmpty} />
                                            ) : (
                                                segments.map(({ sev, height }) => (
                                                    <div
                                                        key={`${dayLabel}-${sev}`}
                                                        style={{
                                                            ...styles.trendSegment,
                                                            height: `${Math.min(height, scale)}px`,
                                                            background: severityPalette[sev],
                                                            opacity: sev === "low" ? 0.75 : 1,
                                                        }}
                                                        aria-hidden
                                                    />
                                                ))
                                            )}
                                        </div>
                                        <div style={{ display: "grid", gap: "0.2rem", justifyItems: "center" }}>
                                            <span style={styles.trendLabel}>{dayLabel}</span>
                                            <span style={styles.trendValue}>{totalForDay}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p style={styles.chartNote}>
                            Last 7 days total: <strong style={{ color: "var(--color-gray-900)" }}>{overallTotal}</strong>
                            {" • "}Peak day: <strong style={{ color: "var(--color-gray-900)" }}>{peakDayLabel}</strong>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
