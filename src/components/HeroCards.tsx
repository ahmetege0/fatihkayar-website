'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type CardKey = 'architecture' | 'academy' | 'photography';

const CARDS: { key: CardKey; route: string }[] = [
    { key: 'architecture', route: '/architecture' },
    { key: 'academy',      route: '/academy' },
    { key: 'photography',  route: '/photography' },
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
        <div style={styles.container}>
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
                    >
                        {/* Floating glass box — only visible on hover */}
                        <div
                            style={{
                                ...styles.glassBox,
                                opacity: isHovered ? 1 : 0,
                                backdropFilter: isHovered ? 'blur(16px)' : 'blur(0px)',
                                WebkitBackdropFilter: isHovered ? 'blur(16px)' : 'blur(0px)',
                                transform: isHovered ? 'scale(1)' : 'scale(0.92)',
                            }}
                        />

                        {/* Content */}
                        <div style={styles.inner}>
                            <div
                                style={{
                                    ...styles.line,
                                    background: isHovered ? 'rgba(240,240,240,0.75)' : 'rgba(240,240,240,0.28)',
                                    height: isHovered ? '88px' : '60px',
                                }}
                            />
                            <span
                                className="font-bahnschrift"
                                style={{
                                    ...styles.label,
                                    color: isHovered ? 'rgba(240,240,240,0.92)' : 'rgba(240,240,240,0.5)',
                                    letterSpacing: isHovered ? '0.32em' : '0.24em',
                                }}
                            >
                                {t(card.key)}
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
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
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
    },
    glassBox: {
        position: 'absolute',
        inset: '48px 20px',           // float — doesn't touch top/bottom edge
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        transition: 'opacity 0.38s ease, backdrop-filter 0.38s ease, transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)',
        pointerEvents: 'none',
    },
    inner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '18px',
        position: 'relative',
        zIndex: 1,
    },
    line: {
        width: '1.5px',
        flexShrink: 0,
        borderRadius: '2px',
        transition: 'background 0.35s ease, height 0.38s cubic-bezier(0.25,0.46,0.45,0.94)',
    },
    label: {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
        fontSize: 'clamp(10px, 1vw, 14px)',
        fontWeight: 600,
        transition: 'color 0.35s ease, letter-spacing 0.35s ease',
    },
};
