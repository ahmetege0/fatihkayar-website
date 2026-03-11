'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type CardKey = 'architecture' | 'academy' | 'photography';

const CARDS: { key: CardKey; route: string }[] = [
    { key: 'architecture', route: '/architecture' },
    { key: 'academy', route: '/academy' },
    { key: 'photography', route: '/photography' },
];

export default function HeroCards() {
    const t = useTranslations('cards');
    const locale = useLocale();
    const router = useRouter();
    const [hovered, setHovered] = useState<CardKey | null>(null);

    const handleClick = (card: typeof CARDS[0]) => {
        router.push(`/${locale}${card.route}`);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .hero-container {
                        flex-direction: column !important;
                        padding-top: 100px !important;
                        height: auto !important;
                        min-height: 100vh;
                        padding-bottom: 40px;
                    }
                    .hero-card-wrapper {
                        flex: none !important;
                        height: 220px !important;
                        width: 100% !important;
                    }
                    .hero-glass-box {
                        inset: 12px 24px !important;
                    }
                    .hero-inner {
                        inset: 12px 24px !important;
                        flex-direction: column !important;
                        justify-content: center !important;
                        gap: 16px !important;
                    }
                    .hero-label {
                        writing-mode: horizontal-tb !important;
                        transform: none !important;
                        font-size: clamp(22px, 6vw, 28px) !important;
                        letter-spacing: 0.15em !important;
                    }
                    .hero-line {
                        width: 60px !important;
                        height: 1.5px !important;
                    }
                }
            `}} />
            <div style={styles.container} className="hero-container">
                {CARDS.map((card, i) => {
                    const isHovered = hovered === card.key;
                    return (
                        <motion.div
                            key={card.key}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.18 + i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                            onMouseEnter={() => setHovered(card.key)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleClick(card)}
                            style={styles.cardWrapper}
                            className="hero-card-wrapper"
                        >
                            {/* Floating glass box — only visible on hover */}
                            <div
                                className="hero-glass-box"
                                style={{
                                    ...styles.glassBox,
                                    opacity: isHovered ? 1 : 0,
                                    backdropFilter: isHovered ? 'blur(10px)' : 'blur(0px)',
                                    WebkitBackdropFilter: isHovered ? 'blur(10px)' : 'blur(0px)',
                                    transform: isHovered ? 'scale(1)' : 'scale(0.92)',
                                }}
                            />

                            {/* Content */}
                            <div style={styles.inner} className="hero-inner">
                                <span
                                    className="font-helvetica hero-label"
                                    style={{
                                        ...styles.label,
                                        color: isHovered ? 'rgba(240,240,240,0.92)' : 'rgba(240,240,240,0.5)',
                                        letterSpacing: isHovered ? '0.12em' : '0.08em',
                                        fontSize: isHovered ? 'clamp(16px, 2vw, 28px)' : 'clamp(20px, 2.5vw, 36px)',
                                    }}
                                >
                                    {t(card.key)}
                                </span>
                                <div
                                    className="hero-line"
                                    style={{
                                        ...styles.line,
                                        background: isHovered ? 'rgba(240,240,240,0.75)' : 'rgba(240,240,240,0.28)',
                                        // Height is handled by flex stretch
                                    }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
        paddingTop: '88px',
    },
    cardWrapper: {
        flex: 1,
        display: 'flex',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
    },
    glassBox: {
        position: 'absolute',
        inset: '48px 20px',           // float — doesn't touch top/bottom edge
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        transition: 'opacity 0.38s ease, backdrop-filter 0.38s ease, transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)',
        pointerEvents: 'none',
    },
    inner: {
        position: 'absolute',
        inset: '80px 40px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '24px',
        zIndex: 1,
    },
    line: {
        width: '1.5px',
        height: '100%',
        flexShrink: 0,
        borderRadius: '2px',
        transition: 'background 0.35s ease',
    },
    label: {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
        fontWeight: 600,
        textTransform: 'uppercase',
        transition: 'color 0.35s ease, letter-spacing 0.35s ease, font-size 0.35s ease',
    },
};
