import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

const MusicRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const oscillatorsRef = useRef([]);

    // All hooks must be called before any conditional returns
    useEffect(() => {
        // Initialize Web Audio API
        if (isOpen) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.connect(audioContextRef.current.destination);
            gainNodeRef.current.gain.value = volume;
        }

        return () => {
            if (isOpen) {
                stopAmbientSound();
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
            }
        };
    }, [isOpen, volume]);

    useEffect(() => {
        if (!isOpen) return;
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = isMuted ? 0 : volume;
        }
    }, [volume, isMuted, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        // Reset timer when opening
        setTimeLeft(180);
        setSessionComplete(false);
        setIsPlaying(false);
        
        let interval;
        if (isTimerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsTimerRunning(false);
                        setSessionComplete(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (sessionComplete) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [sessionComplete, onClose, isOpen]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const generateAmbientSound = () => {
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        
        // Create a more pleasant and melodious ambient soundscape
        // Using major pentatonic scale for a happy, uplifting feel
        const baseFrequencies = [
            { freq: 261.63, type: "sine", gain: 0.05 },    // C4 - Root
            { freq: 293.66, type: "sine", gain: 0.04 },    // D4 - Major second
            { freq: 329.63, type: "sine", gain: 0.06 },    // E4 - Major third
            { freq: 392.00, type: "sine", gain: 0.04 },    // G4 - Perfect fifth
            { freq: 440.00, type: "sine", gain: 0.03 },    // A4 - Major sixth
        ];
        
        // Play a gentle arpeggiated sequence
        baseFrequencies.forEach((config, index) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            
            osc.type = config.type;
            osc.frequency.value = config.freq;
            
            // Gentle envelope with delayed attack for a more musical feel
            oscGain.gain.setValueAtTime(0, ctx.currentTime);
            oscGain.gain.linearRampToValueAtTime(0, ctx.currentTime + index * 0.5);
            oscGain.gain.linearRampToValueAtTime(config.gain, ctx.currentTime + index * 0.5 + 1);
            oscGain.gain.linearRampToValueAtTime(config.gain * 0.7, ctx.currentTime + index * 0.5 + 4);
            oscGain.gain.linearRampToValueAtTime(0, ctx.currentTime + index * 0.5 + 8);
            
            // Add gentle vibrato for warmth
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 0.2 + (index * 0.05); // Slower vibrato
            lfoGain.gain.value = 1;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();
            
            osc.connect(oscGain);
            oscGain.connect(gainNodeRef.current);
            
            osc.start(ctx.currentTime + index * 0.5);
            osc.stop(ctx.currentTime + index * 0.5 + 8);
            
            oscillatorsRef.current.push({ osc, gain: oscGain });
            oscillatorsRef.current.push({ osc: lfo, gain: lfoGain });
        });

        // Add soft nature-like sounds (gentle wind/breeze)
        const bufferSize = 4 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        // Create a more pleasant, whooshing wind sound
        let lastValue = 0;
        for (let i = 0; i < bufferSize; i++) {
            // Smooth random walk for more natural sound
            const white = Math.random() * 2 - 1;
            lastValue = lastValue * 0.995 + white * 0.005;
            output[i] = lastValue;
        }
        
        const windSound = ctx.createBufferSource();
        windSound.buffer = noiseBuffer;
        windSound.loop = true;
        
        const windGain = ctx.createGain();
        windGain.gain.value = 0.02; // Lower volume for subtlety
        
        // Apply a gentle low-pass filter for a warmer sound
        const windFilter = ctx.createBiquadFilter();
        windFilter.type = "lowpass";
        windFilter.frequency.value = 800;
        windFilter.Q.value = 0.3;
        
        windSound.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(gainNodeRef.current);
        
        windSound.start();
        oscillatorsRef.current.push({ osc: windSound, gain: windGain });
    };

    const stopAmbientSound = () => {
        oscillatorsRef.current.forEach(({ osc }) => {
            try {
                osc.stop();
            } catch (e) {
                // Already stopped
            }
        });
        oscillatorsRef.current = [];
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopAmbientSound();
            setIsPlaying(false);
        } else {
            generateAmbientSound();
            setIsPlaying(true);
        }
    };

    const toggleTimer = () => {
        if (isTimerRunning) {
            setIsTimerRunning(false);
        } else {
            setIsTimerRunning(true);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progressPercentage = ((180 - timeLeft) / 180) * 100;

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
            alignItems: "center",
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
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
        visualizer: {
            width: "100%",
            height: "120px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "4px",
        },
        bar: {
            width: "12px",
            background: "var(--color-primary-400)",
            borderRadius: "4px 4px 0 0",
            transition: "height 0.2s ease",
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
                <h1 style={styles.title}>🎧 Ambient Soundscape</h1>
                
                <p style={styles.description}>
                    Immerse yourself in calming frequencies designed to enhance focus and relaxation.
                </p>

                <div style={styles.timer}>{formatTime(timeLeft)}</div>

                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progressPercentage}%` }} />
                </div>

                {isPlaying && (
                    <div style={styles.visualizer}>
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.bar,
                                    height: `${20 + Math.sin(Date.now() / 200 + i) * 40}px`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <div style={styles.controls}>
                    <button
                        onClick={togglePlay}
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(56,189,248,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {isPlaying ? (
                            <PauseIcon style={{ width: "28px", height: "28px" }} />
                        ) : (
                            <PlayIcon style={{ width: "28px", height: "28px" }} />
                        )}
                    </button>
                    <button
                        onClick={toggleTimer}
                        style={{...styles.button, marginLeft: "1rem"}}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(56,189,248,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {isTimerRunning ? (
                            <PauseIcon style={{ width: "28px", height: "28px" }} />
                        ) : (
                            <PlayIcon style={{ width: "28px", height: "28px" }} />
                        )}
                    </button>
                </div>

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
                            <SpeakerXMarkIcon style={{ width: "24px", height: "24px" }} />
                        ) : (
                            <SpeakerWaveIcon style={{ width: "24px", height: "24px" }} />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        style={styles.slider}
                    />
                </div>
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

export default MusicRelaxation;
