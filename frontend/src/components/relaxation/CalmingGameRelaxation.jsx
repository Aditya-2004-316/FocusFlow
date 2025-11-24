import React, { useState, useEffect } from "react";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CalmingGameRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [tiles, setTiles] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    const symbols = ["🌸", "🌺", "🍃", "🌊", "⭐", "🌙", "☀️", "🦋"];

    useEffect(() => {
        if (!isOpen) return;
        initializeGame();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        // Reset timer when opening
        setTimeLeft(180);
        setSessionComplete(false);
        
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setSessionComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (sessionComplete) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [sessionComplete, onClose, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (revealed.length === 2) {
            const [first, second] = revealed;
            if (tiles[first] === tiles[second]) {
                setMatched([...matched, first, second]);
                setRevealed([]);
                
                if (matched.length + 2 === tiles.length) {
                    setGameComplete(true);
                }
            } else {
                setTimeout(() => setRevealed([]), 800);
            }
        }
    }, [revealed, isOpen]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const initializeGame = () => {
        const pairs = [...symbols, ...symbols];
        const shuffled = pairs.sort(() => Math.random() - 0.5);
        setTiles(shuffled);
        setRevealed([]);
        setMatched([]);
        setMoves(0);
        setGameComplete(false);
    };

    const handleTileClick = (index) => {
        if (revealed.length >= 2 || revealed.includes(index) || matched.includes(index)) {
            return;
        }
        
        setRevealed([...revealed, index]);
        if (revealed.length === 1) {
            setMoves(moves + 1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const styles = {
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-out",
        },
        closeButton: {
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--input-border)",
            background: "var(--panel-bg)",
            color: "var(--color-gray-700)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
        },
        card: {
            position: "relative",
            maxWidth: "800px",
            width: "100%",
            background: "var(--panel-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "1.5rem",
            padding: "3rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        stats: {
            display: "flex",
            gap: "2rem",
            fontSize: "1rem",
            fontWeight: 600,
        },
        timer: {
            color: "var(--color-primary-600)",
        },
        moves: {
            color: "var(--color-gray-600)",
        },
        description: {
            color: "var(--color-gray-600)",
            fontSize: "1rem",
            lineHeight: 1.6,
            textAlign: "center",
        },
        gameBoard: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            margin: "1rem 0",
        },
        tile: {
            aspectRatio: "1",
            borderRadius: "1rem",
            border: "2px solid var(--input-border)",
            background: "var(--color-white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            userSelect: "none",
        },
        tileHidden: {
            background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1))",
        },
        tileRevealed: {
            background: "var(--color-white)",
            transform: "rotateY(180deg)",
        },
        tileMatched: {
            background: "var(--color-green-100)",
            border: "2px solid var(--color-green-400)",
            opacity: 0.6,
        },
        button: {
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            justifyContent: "center",
            transition: "all 0.2s ease",
        },
        completeMessage: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-green-600)",
            textAlign: "center",
        },
        gameCompleteMessage: {
            textAlign: "center",
            color: "var(--color-green-600)",
            fontWeight: 600,
            fontSize: "1.2rem",
        },
        skipButton: {
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
            marginTop: "1rem",
        },
    };

    if (sessionComplete) {
        const stylesWithSkipButton = {
            ...styles,
            skipButton: {
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "none",
                background: "var(--color-primary-100)",
                color: "var(--color-primary-700)",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
                marginTop: "1rem",
            }
        };

        return (
            <div style={stylesWithSkipButton.modalOverlay} onClick={onClose}>
                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes slideUp {
                            from { transform: translateY(20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}
                </style>
                <div style={stylesWithSkipButton.card} onClick={(e) => e.stopPropagation()}>
                    <h1 style={stylesWithSkipButton.completeMessage}>
                        ✨ Session Complete
                    </h1>
                    <p style={stylesWithSkipButton.description}>
                        Your mind is refreshed and ready to focus.
                    </p>
                    <p style={stylesWithSkipButton.description}>
                        Returning to Dashboard...
                    </p>
                    <button
                        onClick={onSkipToFocus}
                        style={stylesWithSkipButton.skipButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--color-primary-200)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
            <div style={styles.card} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={styles.closeButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-gray-100)";
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--panel-bg)";
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <XMarkIcon style={{ width: "24px", height: "24px" }} />
                </button>
                <div style={styles.header}>
                    <h1 style={styles.title}>🎮 Memory Match</h1>
                    <div style={styles.stats}>
                        <span style={styles.timer}>{formatTime(timeLeft)}</span>
                        <span style={styles.moves}>Moves: {moves}</span>
                    </div>
                </div>

                <p style={styles.description}>
                    Match pairs of symbols to calm your mind. Focus on the patterns and let your memory guide you.
                </p>

                {gameComplete && (
                    <p style={styles.gameCompleteMessage}>
                        🎉 Perfect! You matched all pairs in {moves} moves!
                    </p>
                )}

                <div style={styles.gameBoard}>
                    {tiles.map((symbol, index) => {
                        const isRevealed = revealed.includes(index);
                        const isMatched = matched.includes(index);
                        
                        return (
                            <div
                                key={index}
                                onClick={() => handleTileClick(index)}
                                style={{
                                    ...styles.tile,
                                    ...(isRevealed || isMatched ? styles.tileRevealed : styles.tileHidden),
                                    ...(isMatched ? styles.tileMatched : {}),
                                    cursor: isMatched ? "default" : "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMatched && !isRevealed) {
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(56,189,248,0.2)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMatched && !isRevealed) {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }
                                }}
                            >
                                {isRevealed || isMatched ? symbol : "?"}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={initializeGame}
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-200)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-100)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <ArrowPathIcon style={{ width: "20px", height: "20px" }} />
                    New Game
                </button>
                <button
                    onClick={onSkipToFocus}
                    style={styles.skipButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-200)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-100)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    Skip to Focus Session
                </button>
            </div>
        </div>
    );
};

export default CalmingGameRelaxation;
