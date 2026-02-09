import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    MusicalNoteIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

const TRACKS = [
    {
        id: "ambient",
        title: "Ambient Soundscape",
        subtitle: "Soothing synth pads",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_e5064cde6d.mp3?filename=calm-and-peaceful-110437.mp3",
    },
    {
        id: "forest",
        title: "Forest Retreat",
        subtitle: "Birdsong and breeze",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_e66d3dbeea.mp3?filename=forest-lullaby-110368.mp3",
    },
    {
        id: "ocean",
        title: "Ocean Serenity",
        subtitle: "Rolling shoreline waves",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c7c5b8c6d0.mp3?filename=calm-ocean-waves-110371.mp3",
    },
    {
        id: "piano",
        title: "Piano Drift",
        subtitle: "Gentle piano harmonies",
        url: "https://cdn.pixabay.com/download/audio/2022/10/03/audio_8e1b7beb2e.mp3?filename=deep-relaxation-ambient-120300.mp3",
    },
    {
        id: "rain",
        title: "Rain Cocoon",
        subtitle: "Soft nighttime rain",
        url: "https://cdn.pixabay.com/download/audio/2022/02/14/audio_1afac191f0.mp3?filename=rain-ambient-110100.mp3",
    },
];

const SESSION_DURATION = 180;

const MusicRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [selectedTrackId, setSelectedTrackId] = useState(TRACKS[0].id);
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const shouldResumeRef = useRef(false);
    const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);
    const [usingFallback, setUsingFallback] = useState(false);
    const audioCtxRef = useRef(null);
    const masterGainRef = useRef(null);
    const oscRef = useRef(null);
    const lfoRef = useRef(null);

    const selectedTrack = useMemo(
        () => TRACKS.find((track) => track.id === selectedTrackId) ?? TRACKS[0],
        [selectedTrackId]
    );

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const teardownAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
    };

    const stopFallback = () => {
        try {
            if (lfoRef.current) {
                lfoRef.current.disconnect();
                lfoRef.current = null;
            }
            if (oscRef.current) {
                oscRef.current.stop(0);
                oscRef.current.disconnect();
                oscRef.current = null;
            }
            if (masterGainRef.current) {
                masterGainRef.current.disconnect();
                masterGainRef.current = null;
            }
            if (audioCtxRef.current) {
                // keep context for reuse; do not close for iOS
                audioCtxRef.current.suspend().catch(() => {});
            }
        } catch {}
        setUsingFallback(false);
        setIsActuallyPlaying(false);
    };

    const startFallback = async () => {
        if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return; // no WebAudio available
            audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        try {
            await ctx.resume();
        } catch {}

        const master = ctx.createGain();
        master.gain.value = 0.15; // gentle volume
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // Two slightly detuned oscillators for a soft pad
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const detune = ctx.createGain();
        detune.gain.value = 0.002; // subtle FM

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08; // slow movement
        lfoGain.gain.value = 300;
        lfo.connect(lfoGain).connect(filter.frequency);

        osc.type = "sine";
        osc.frequency.value = 220;
        osc2.type = "sine";
        osc2.frequency.value = 221.5;
        osc2.connect(detune);
        detune.connect(filter);
        osc.connect(filter);
        filter.connect(master);

        osc.start();
        osc2.start();
        lfo.start();

        oscRef.current = osc;
        lfoRef.current = lfo;
        setUsingFallback(true);
        setIsActuallyPlaying(true);
        // timer will be started by effect reacting to isActuallyPlaying
    };

    const createAudioInstance = () => {
        if (!selectedTrack) return null;
        const audio = new Audio(selectedTrack.url);
        audio.crossOrigin = "anonymous";
        audio.preload = "auto";
        audio.loop = true;
        audio.volume = volume;
        audio.muted = isMuted;
        return audio;
    };

    const ensureAudioInstance = () => {
        if (!selectedTrack) {
            return null;
        }

        if (!audioRef.current) {
            audioRef.current = createAudioInstance();
        } else {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }

        return audioRef.current;
    };

    // Reset state when modal visibility changes
    useEffect(() => {
        if (!isOpen) {
            clearTimer();
            teardownAudio();
            stopFallback();
            shouldResumeRef.current = false;
            setIsPlaying(false);
            setSessionComplete(false);
            setTimeLeft(SESSION_DURATION);
            return;
        }

        setTimeLeft(SESSION_DURATION);
        setSessionComplete(false);
        setIsPlaying(false);
    }, [isOpen]);

    // Create or switch audio when track changes
    useEffect(() => {
        if (!isOpen || !selectedTrack) return;

        const audio = createAudioInstance();
        const shouldResume = shouldResumeRef.current;
        shouldResumeRef.current = false;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        audioRef.current = audio;
        setSessionComplete(false);
        setTimeLeft(SESSION_DURATION);

        const onPlaying = () => {
            setIsActuallyPlaying(true);
        };
        const onPause = () => {
            setIsActuallyPlaying(false);
        };
        const onEnded = () => {
            setIsActuallyPlaying(false);
        };
        const onError = () => {
            setIsActuallyPlaying(false);
            if (isPlaying) startFallback();
        };

        audio.addEventListener("playing", onPlaying);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("error", onError);

        if (shouldResume) {
            audio
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // Fallback to WebAudio if media cannot play
                    setIsPlaying(true);
                    startFallback();
                });
        }

        return () => {
            audio.pause();
            audio.removeEventListener("playing", onPlaying);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("error", onError);
        };
    }, [selectedTrack, isOpen]);

    // Sync audio volume and mute state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
        if (masterGainRef.current) {
            masterGainRef.current.gain.value = isMuted
                ? 0
                : Math.max(0, Math.min(1, volume)) * 0.25;
        }
    }, [volume, isMuted]);

    // React to UI play/pause intent
    useEffect(() => {
        if (!isOpen) return;
        const audio = ensureAudioInstance();
        if (isPlaying) {
            if (usingFallback) {
                startFallback();
            } else if (audio) {
                audio.play().catch(() => startFallback());
            }
        } else {
            audio?.pause();
            stopFallback();
        }
    }, [isPlaying, isOpen]);

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

    // Start/stop countdown strictly when sound is actually audible
    useEffect(() => {
        if (!isOpen) return;

        const startTimer = () => {
            clearTimer();
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearTimer();
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                        stopFallback();
                        setIsPlaying(false);
                        setSessionComplete(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        if (isActuallyPlaying) {
            startTimer();
        } else {
            clearTimer();
        }

        return () => clearTimer();
    }, [isActuallyPlaying, isOpen]);

    useEffect(() => {
        if (!isOpen || !sessionComplete) return;
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [sessionComplete, onClose, isOpen]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const togglePlay = () => {
        // Single source of truth: let isPlaying drive audio + timer via effect above
        if (isPlaying) {
            setIsPlaying(false);
            shouldResumeRef.current = false;
        } else {
            setSessionComplete(false);
            if (timeLeft === 0) setTimeLeft(SESSION_DURATION);
            setIsPlaying(true);
        }
    };

    const handleRestart = () => {
        clearTimer();
        setSessionComplete(false);
        setTimeLeft(SESSION_DURATION);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        if (isPlaying) {
            // rely on isPlaying effect to start audio; also mark as not actually playing until event fires
            setIsActuallyPlaying(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progressPercentage =
        ((SESSION_DURATION - timeLeft) / SESSION_DURATION) * 100;

    const handleTrackSelect = (trackId) => {
        if (trackId === selectedTrackId) return;
        shouldResumeRef.current = isPlaying;
        clearTimer();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
        setSessionComplete(false);
        setTimeLeft(SESSION_DURATION);
        setSelectedTrackId(trackId);
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
            alignItems: "center",
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
            zIndex: 9999,
            pointerEvents: "auto",
        },
        trackSelector: {
            display: "grid",
            gap: "1.25rem",
            width: "100%",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        },
        trackButton: {
            padding: "1.1rem 1.25rem",
            borderRadius: "1rem",
            border: "1px solid var(--input-border)",
            background: "var(--panel-bg-light, rgba(255,255,255,0.08))",
            color: "var(--color-gray-700)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "left",
            minHeight: "96px",
            boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
        },
        trackButtonActive: {
            borderColor: "var(--color-primary-400)",
            background:
                "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(129,140,248,0.18))",
            color: "var(--color-primary-700)",
            boxShadow: "0 12px 28px rgba(56,189,248,0.18)",
        },
        trackTitle: {
            fontWeight: 600,
            margin: 0,
            fontSize: "1rem",
        },
        trackSubtitle: {
            margin: "0.15rem 0 0",
            fontSize: "0.85rem",
            color: "var(--color-gray-500)",
        },
        trackIconWrap: {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            textAlign: "center",
            margin: 0,
        },
        timer: {
            fontSize: "4rem",
            fontWeight: 700,
            color: "var(--color-primary-600)",
            letterSpacing: "0.05em",
        },
        progressBar: {
            width: "100%",
            height: "8px",
            background: "var(--color-gray-200)",
            borderRadius: "999px",
            overflow: "hidden",
        },
        progressFill: {
            height: "100%",
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            borderRadius: "999px",
            transition: "width 0.3s ease",
        },
        controls: {
            display: "flex",
            gap: "1rem",
            alignItems: "center",
        },
        button: {
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid var(--color-primary-500)",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        volumeControl: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
            maxWidth: "300px",
        },
        slider: {
            flex: 1,
            height: "6px",
            borderRadius: "999px",
            background: "var(--color-gray-200)",
            outline: "none",
            cursor: "pointer",
        },
        description: {
            textAlign: "center",
            color: "var(--color-gray-600)",
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        completeMessage: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-green-600)",
            textAlign: "center",
        },
        skipButton: {
            padding: "0.85rem 1.75rem",
            minHeight: "3rem",
            minWidth: 0,
            borderRadius: "0.9rem",
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
            justifyContent: "center",
        },
        controlRow: {
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        secondaryButton: {
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            background: "var(--color-primary-50)",
            color: "var(--color-primary-600)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
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
                <h1 style={styles.title}>🎧 Ambient Soundscape</h1>

                <p style={styles.description}>
                    Immerse yourself in calming frequencies designed to enhance
                    focus and relaxation.
                </p>

                <div style={styles.timer}>{formatTime(timeLeft)}</div>

                <div style={styles.progressBar}>
                    <div
                        style={{
                            ...styles.progressFill,
                            width: `${progressPercentage}%`,
                        }}
                    />
                </div>

                <div style={styles.controlRow}>
                    <button
                        onClick={togglePlay}
                        style={styles.button}
                        aria-pressed={isPlaying}
                        aria-label={
                            isPlaying
                                ? "Pause soundscape"
                                : `Play ${selectedTrack.title}`
                        }
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 16px rgba(56,189,248,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {isPlaying ? (
                            <PauseIcon
                                style={{ width: "28px", height: "28px" }}
                            />
                        ) : (
                            <PlayIcon
                                style={{ width: "28px", height: "28px" }}
                            />
                        )}
                    </button>
                    <button
                        onClick={handleRestart}
                        style={styles.button}
                        aria-label="Restart session"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 16px rgba(56,189,248,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <ArrowPathIcon
                            style={{ width: "24px", height: "24px" }}
                        />
                    </button>
                    <div style={styles.volumeControl}>
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "var(--color-gray-600)",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {isMuted ? (
                                <SpeakerXMarkIcon
                                    style={{ width: "24px", height: "24px" }}
                                />
                            ) : (
                                <SpeakerWaveIcon
                                    style={{ width: "24px", height: "24px" }}
                                />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) =>
                                setVolume(parseFloat(e.target.value))
                            }
                            style={styles.slider}
                        />
                    </div>
                </div>

                <div style={styles.trackSelector}>
                    {TRACKS.map((track) => {
                        const isActive = track.id === selectedTrackId;
                        return (
                            <button
                                key={track.id}
                                type="button"
                                onClick={() => handleTrackSelect(track.id)}
                                style={{
                                    ...styles.trackButton,
                                    ...(isActive
                                        ? styles.trackButtonActive
                                        : {}),
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                }}
                            >
                                <div
                                    style={{
                                        ...styles.trackIconWrap,
                                        background: isActive
                                            ? "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(129,140,248,0.35))"
                                            : "rgba(148,163,184,0.18)",
                                        color: isActive
                                            ? "var(--color-primary-800)"
                                            : "var(--color-gray-500)",
                                    }}
                                >
                                    <MusicalNoteIcon
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <p style={styles.trackTitle}>
                                        {track.title}
                                    </p>
                                    <p style={styles.trackSubtitle}>
                                        {track.subtitle}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={onSkipToFocus}
                    style={styles.skipButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-primary-200)";
                        e.currentTarget.style.transform = "translateY(-2px)";
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
};

export default MusicRelaxation;
