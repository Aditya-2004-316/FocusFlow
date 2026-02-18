import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ActionRow, ActionButton } from "./shared/ActivityActions.jsx";
import { useTheme } from "../../context/ThemeContext";
import useResponsive from "../../hooks/useResponsive";

const CalmingGameRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const { isDarkMode } = useTheme();
    const { width } = useResponsive();
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [activeGame, setActiveGame] = useState("memory");
    // Memory Match state
    const [tiles, setTiles] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [matched, setMatched] = useState([]);
    // Shared stats
    const [moves, setMoves] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    // Bubble Pop state
    const [bubbles, setBubbles] = useState([]);
    // Sliding Puzzle state
    const [puzzleTiles, setPuzzleTiles] = useState([]); // 0 represents empty slot
    const [puzzleImageUrl, setPuzzleImageUrl] = useState(null);
    const [dragIdx, setDragIdx] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const startPointRef = useRef(null);

    const symbols = ["🌸", "🌺", "🍃", "🌊", "⭐", "🌙", "☀️", "🦋"];

    useEffect(() => {
        if (!isOpen) return;
        initializeActiveGame();
    }, [isOpen, activeGame]);

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

    // Body scroll lock when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || activeGame !== "memory") return;
        if (revealed.length === 2) {
            const [first, second] = revealed;
            if (tiles[first] === tiles[second]) {
                setMatched((prev) => [...prev, first, second]);
                setRevealed([]);
                if (matched.length + 2 === tiles.length) {
                    setGameComplete(true);
                }
            } else {
                const timeout = setTimeout(() => setRevealed([]), 800);
                return () => clearTimeout(timeout);
            }
        }
    }, [revealed, isOpen, activeGame, tiles, matched.length]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const initializeMemory = () => {
        const pairs = [...symbols, ...symbols];
        const shuffled = pairs.sort(() => Math.random() - 0.5);
        setTiles(shuffled);
        setRevealed([]);
        setMatched([]);
        setMoves(0);
        setGameComplete(false);
    };

    const initializeBubbles = () => {
        const count = 14;
        const items = Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: 36 + Math.floor(Math.random() * 28),
            left: Math.random() * 85 + 5,
            top: Math.random() * 60 + 10,
            duration: 3 + Math.random() * 3,
            popped: false,
        }));
        setBubbles(items);
        setMoves(0);
        setGameComplete(false);
    };

    const generatePuzzleImageURL = () => {
        const size = 600;
        const c = document.createElement("canvas");
        c.width = c.height = size;
        const ctx = c.getContext("2d");
        // Background sky
        const sky = ctx.createLinearGradient(0, 0, 0, size);
        sky.addColorStop(0, "#8ec5ff");
        sky.addColorStop(1, "#e6f3ff");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, size, size);
        // Sea
        const seaGrad = ctx.createLinearGradient(0, size * 0.4, 0, size);
        seaGrad.addColorStop(0, "#67b7ff");
        seaGrad.addColorStop(1, "#2f7fe6");
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, size * 0.45, size, size * 0.55);
        // Sun
        ctx.beginPath();
        ctx.arc(size * 0.75, size * 0.25, size * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = "#ffd166";
        ctx.fill();
        // Waves
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 3;
        for (let y = size * 0.5; y < size; y += 28) {
            ctx.beginPath();
            for (let x = 0; x <= size; x += 20) {
                const offset = Math.sin((x + y) / 40) * 6;
                ctx.lineTo(x, y + offset);
            }
            ctx.stroke();
        }
        return c.toDataURL("image/png");
    };

    const initializeSlider = () => {
        // ensure image ready
        if (!puzzleImageUrl) {
            setPuzzleImageUrl(generatePuzzleImageURL());
        }
        // Start from solved and perform valid random moves (parity-safe)
        const neighbors = (idx) => {
            const r = Math.floor(idx / 3),
                c = idx % 3;
            const nb = [];
            if (r > 0) nb.push((r - 1) * 3 + c);
            if (r < 2) nb.push((r + 1) * 3 + c);
            if (c > 0) nb.push(r * 3 + (c - 1));
            if (c < 2) nb.push(r * 3 + (c + 1));
            return nb;
        };
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        let empty = 8;
        for (let i = 0; i < 200; i++) {
            const nb = neighbors(empty);
            const choice = nb[Math.floor(Math.random() * nb.length)];
            [arr[empty], arr[choice]] = [arr[choice], arr[empty]];
            empty = choice;
        }
        setPuzzleTiles(arr);
        setMoves(0);
        setGameComplete(false);
    };

    const initializeActiveGame = () => {
        if (activeGame === "memory") return initializeMemory();
        if (activeGame === "bubbles") return initializeBubbles();
        if (activeGame === "slider") return initializeSlider();
    };

    const handleTileClick = (index) => {
        if (activeGame !== "memory") return;
        if (
            revealed.length >= 2 ||
            revealed.includes(index) ||
            matched.includes(index)
        ) {
            return;
        }
        setRevealed((prev) => [...prev, index]);
        if (revealed.length === 1) {
            setMoves((m) => m + 1);
        }
    };

    const handleBubbleClick = (id) => {
        if (activeGame !== "bubbles") return;
        setBubbles((prev) => {
            const next = prev.map((b) =>
                b.id === id ? { ...b, popped: true } : b
            );
            const totalPopped = next.filter((b) => b.popped).length;
            setMoves(totalPopped);
            if (totalPopped === next.length) setGameComplete(true);
            return next;
        });
    };

    const canSwap = (i, j) => {
        const r1 = Math.floor(i / 3),
            c1 = i % 3;
        const r2 = Math.floor(j / 3),
            c2 = j % 3;
        return (
            (r1 === r2 && Math.abs(c1 - c2) === 1) ||
            (c1 === c2 && Math.abs(r1 - r2) === 1)
        );
    };

    const handleSliderClick = (index) => {
        if (activeGame !== "slider") return;
        const empty = puzzleTiles.indexOf(0);
        if (canSwap(index, empty)) {
            const next = [...puzzleTiles];
            [next[index], next[empty]] = [next[empty], next[index]];
            setPuzzleTiles(next);
            setMoves((m) => m + 1);
            const solved = next.every((v, i) =>
                i < 8 ? v === i + 1 : v === 0
            );
            if (solved) setGameComplete(true);
        }
    };

    // Drag support (pointer events)
    const handlePointerDown = (idx, e) => {
        if (activeGame !== "slider") return;
        const empty = puzzleTiles.indexOf(0);
        if (!canSwap(idx, empty)) return; // only movable tiles draggable
        setDragIdx(idx);
        setDragOffset({ x: 0, y: 0 });
        startPointRef.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (idx, e) => {
        if (dragIdx !== idx) return;
        const empty = puzzleTiles.indexOf(0);
        const start = startPointRef.current;
        if (!start) return;
        let dx = e.clientX - start.x;
        let dy = e.clientY - start.y;
        // Constrain to axis towards empty
        const r1 = Math.floor(idx / 3),
            c1 = idx % 3;
        const r2 = Math.floor(empty / 3),
            c2 = empty % 3;
        if (r1 === r2) {
            dy = 0;
            dx = Math.sign(c2 - c1) * Math.max(0, Math.min(Math.abs(dx), 80));
        } else if (c1 === c2) {
            dx = 0;
            dy = Math.sign(r2 - r1) * Math.max(0, Math.min(Math.abs(dy), 80));
        }
        setDragOffset({ x: dx, y: dy });
    };

    const handlePointerUp = (idx, e) => {
        if (dragIdx !== idx) return;
        const movedEnough =
            Math.abs(dragOffset.x) + Math.abs(dragOffset.y) > 20;
        setDragIdx(null);
        setDragOffset({ x: 0, y: 0 });
        startPointRef.current = null;
        if (movedEnough) {
            handleSliderClick(idx);
        }
    };

    const handleGameSwitch = (game) => {
        if (game === activeGame) return;
        setActiveGame(game);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const styles = {
        backdrop: {
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 9998,
            animation: "fadeIn 0.3s ease-out",
            pointerEvents: "auto",
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
            zIndex: 9999,
            pointerEvents: "auto",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
        },
        gameTabs: {
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        tabButton: {
            padding: "0.45rem 0.9rem",
            borderRadius: "0.6rem",
            border: isDarkMode ? "1px solid transparent" : "1px solid var(--input-border)",
            background: isDarkMode ? "transparent" : "var(--color-white)",
            color: isDarkMode ? "#ffffff" : "var(--color-gray-800)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        tabActive: {
            background: isDarkMode ? "var(--color-primary-900)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-800)",
            borderColor: isDarkMode ? "var(--color-primary-500)" : "var(--color-primary-300)",
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
            gridTemplateColumns: width < 480 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
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
            background:
                "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1))",
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
            border: isDarkMode ? "1px solid var(--color-primary-700)" : "none",
            background: isDarkMode ? "var(--color-gray-800)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            justifyContent: "center",
            transition: "all 0.2s ease",
        },
        bubbleArea: {
            position: "relative",
            minHeight: width < 660 ? "560px" : "260px",
            flexShrink: 0,
            width: "100%",
            borderRadius: "1rem",
            border: "1px solid var(--input-border)",
            background:
                "linear-gradient(180deg, rgba(56,189,248,0.08), rgba(129,140,248,0.08))",
            overflow: "hidden",
            margin: "1rem 0",
        },
        bubble: {
            position: "absolute",
            borderRadius: "50%",
            background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(56,189,248,0.5))",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 6px 16px rgba(56,189,248,0.35)",
            cursor: "pointer",
            transition: "transform 0.2s ease, opacity 0.2s ease",
        },
        sliderBoard: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            margin: "1rem 0",
        },
        sliderTile: {
            aspectRatio: "1",
            borderRadius: "0.9rem",
            border: "2px solid var(--input-border)",
            background: "var(--color-white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-gray-800)",
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.2s ease",
            backgroundRepeat: "no-repeat",
            backgroundSize: "300% 300%",
        },
        sliderBlank: {
            background: "var(--color-gray-100)",
            borderStyle: "dashed",
            cursor: "default",
        },
        sliderMovable: {
            boxShadow: "0 0 0 2px var(--color-primary-300) inset",
        },
        footerRow: {
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
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
            padding: "0.7rem 1.5rem",
            borderRadius: "0.9rem",
            border: isDarkMode ? "1px solid var(--color-primary-700)" : "none",
            background: isDarkMode ? "var(--color-gray-800)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
            marginTop: "1rem",
        },
    };

    if (sessionComplete) {
        const stylesWithSkipButton = {
            ...styles,
            skipButton: { ...styles.skipButton },
        };

        return createPortal(
            <div
                style={stylesWithSkipButton.backdrop}
                onClick={onClose}
                role="presentation"
            >
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
                        @keyframes drift {
                            from { transform: translateY(0); }
                            to { transform: translateY(-12px); }
                        }
                    `}
                </style>
                <div
                    style={stylesWithSkipButton.card}
                    onClick={(e) => e.stopPropagation()}
                >
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
                            e.currentTarget.style.background =
                                "var(--color-primary-200)";
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div style={styles.backdrop} onClick={onClose} role="presentation">
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
                    @keyframes drift {
                        from { transform: translateY(0); }
                        to { transform: translateY(-12px); }
                    }
                `}
            </style>
            <div style={styles.card} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={styles.closeButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-gray-100)";
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
                    <h1 style={styles.title}>
                        {activeGame === "memory" && "🎮 Memory Match"}
                        {activeGame === "bubbles" && "🫧 Bubble Pop"}
                        {activeGame === "slider" && "🧩 Sliding Puzzle"}
                    </h1>
                    <div style={styles.stats}>
                        <span style={styles.timer}>{formatTime(timeLeft)}</span>
                        <span style={styles.moves}>
                            {activeGame === "bubbles" ? "Pops" : "Moves"}:{" "}
                            {moves}
                        </span>
                    </div>
                </div>

                <div style={styles.gameTabs}>
                    {[
                        { id: "memory", label: "Memory Match" },
                        { id: "bubbles", label: "Bubble Pop" },
                        { id: "slider", label: "Sliding Puzzle" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleGameSwitch(tab.id)}
                            style={{
                                ...styles.tabButton,
                                ...(activeGame === tab.id
                                    ? styles.tabActive
                                    : {}),
                            }}
                            onMouseEnter={(e) => {
                                if (activeGame !== tab.id)
                                    e.currentTarget.style.background =
                                        "var(--color-gray-100)";
                            }}
                            onMouseLeave={(e) => {
                                if (activeGame !== tab.id)
                                    e.currentTarget.style.background =
                                        "var(--color-white)";
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <p style={styles.description}>
                    {activeGame === "memory" &&
                        "Match pairs of symbols to calm your mind. Focus on the patterns and let your memory guide you."}
                    {activeGame === "bubbles" &&
                        "Gently pop the floating bubbles. Take your time and enjoy the motion."}
                    {activeGame === "slider" &&
                        "Slide tiles into the empty space to complete the picture. You can move tiles horizontally or vertically only. Click or drag adjacent tiles into the empty slot."}
                </p>

                {gameComplete && (
                    <p style={styles.gameCompleteMessage}>
                        {activeGame === "memory" &&
                            `🎉 Perfect! You matched all pairs in ${moves} moves!`}
                        {activeGame === "bubbles" &&
                            `🫧 All bubbles popped! Total: ${moves}`}
                        {activeGame === "slider" &&
                            `🧩 Solved in ${moves} moves!`}
                    </p>
                )}

                {activeGame === "memory" && (
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
                                        ...(isRevealed || isMatched
                                            ? styles.tileRevealed
                                            : styles.tileHidden),
                                        ...(isMatched
                                            ? styles.tileMatched
                                            : {}),
                                        cursor: isMatched
                                            ? "default"
                                            : "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMatched && !isRevealed) {
                                            e.currentTarget.style.transform =
                                                "scale(1.05)";
                                            e.currentTarget.style.boxShadow =
                                                "0 4px 12px rgba(56,189,248,0.2)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMatched && !isRevealed) {
                                            e.currentTarget.style.transform =
                                                "scale(1)";
                                            e.currentTarget.style.boxShadow =
                                                "none";
                                        }
                                    }}
                                >
                                    {isRevealed || isMatched ? symbol : "?"}
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeGame === "bubbles" && (
                    <div style={styles.bubbleArea}>
                        {bubbles.map((b) => (
                            <div
                                key={b.id}
                                onClick={() => handleBubbleClick(b.id)}
                                style={{
                                    ...styles.bubble,
                                    width: `${b.size}px`,
                                    height: `${b.size}px`,
                                    left: `${b.left}%`,
                                    top: `${b.top}%`,
                                    opacity: b.popped ? 0.25 : 1,
                                    transform: b.popped
                                        ? "scale(0.8)"
                                        : undefined,
                                    animation: `drift ${b.duration}s ease-in-out infinite alternate`,
                                }}
                                onMouseEnter={(e) => {
                                    if (!b.popped)
                                        e.currentTarget.style.transform =
                                            "scale(1.08)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!b.popped)
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                }}
                            />
                        ))}
                    </div>
                )}

                {activeGame === "slider" && (
                    <div style={styles.sliderBoard}>
                        {puzzleTiles.map((val, idx) => {
                            const isBlank = val === 0;
                            const col = (val - 1) % 3;
                            const row = Math.floor((val - 1) / 3);
                            const bgPos = !isBlank
                                ? `${col * 50}% ${row * 50}%`
                                : undefined;
                            const empty = puzzleTiles.indexOf(0);
                            const isMovable = !isBlank && canSwap(idx, empty);
                            const isDragging = dragIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    aria-label={
                                        !isBlank ? `Tile ${val}` : "Empty"
                                    }
                                    onClick={() => handleSliderClick(idx)}
                                    onPointerDown={(e) =>
                                        handlePointerDown(idx, e)
                                    }
                                    onPointerMove={(e) =>
                                        handlePointerMove(idx, e)
                                    }
                                    onPointerUp={(e) => handlePointerUp(idx, e)}
                                    style={{
                                        ...styles.sliderTile,
                                        ...(isBlank
                                            ? styles.sliderBlank
                                            : {
                                                backgroundImage: `url(${puzzleImageUrl})`,
                                                backgroundPosition: bgPos,
                                                color: "transparent",
                                            }),
                                        ...(isMovable
                                            ? styles.sliderMovable
                                            : {}),
                                        transform: isDragging
                                            ? `translate(${dragOffset.x}px, ${dragOffset.y}px)`
                                            : undefined,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isBlank && !isDragging)
                                            e.currentTarget.style.transform =
                                                "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isBlank && !isDragging)
                                            e.currentTarget.style.transform =
                                                "translateY(0)";
                                    }}
                                />
                            );
                        })}
                    </div>
                )}

                <ActionRow style={styles.footerRow}>
                    <ActionButton
                        onClick={initializeActiveGame}
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-200)";
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <ArrowPathIcon
                            style={{ width: "20px", height: "20px" }}
                        />
                        New Game
                    </ActionButton>
                    <ActionButton
                        onClick={onSkipToFocus}
                        style={styles.skipButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-200)";
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </ActionButton>
                </ActionRow>
            </div>
        </div>,
        document.body
    );
};

export default CalmingGameRelaxation;
