'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

type Level = 'instructor' | 'advanced' | 'intermediate' | 'beginner';

type Program = {
    name: string;
    level: Level;
    icon: string;
    color: string;
};

type Category = {
    key: 'modeling' | 'presentation' | 'visualization';
    programs: Program[];
};

const CATEGORIES: Category[] = [
    {
        key: 'modeling',
        programs: [
            { name: 'SketchUp', level: 'instructor', icon: '/icons/sketchup.png', color: '#E83A3A' },
            { name: 'AutoCAD', level: 'advanced', icon: '/icons/autocad.png', color: '#CC0000' },
            { name: 'Revit', level: 'intermediate', icon: '/icons/revit.png', color: '#4A90D9' },
            { name: 'Rhino + Grasshopper', level: 'intermediate', icon: '/icons/rhino.png', color: '#888888' },
            { name: '3ds Max', level: 'beginner', icon: '/icons/3dsmax.png', color: '#0696D7' },
        ],
    },
    {
        key: 'presentation',
        programs: [
            { name: 'Photoshop', level: 'advanced', icon: '/icons/photoshop.png', color: '#31A8FF' },
            { name: 'Lightroom', level: 'advanced', icon: '/icons/lightroom.png', color: '#3EB6F4' },
            { name: 'Illustrator', level: 'intermediate', icon: '/icons/illustrator.png', color: '#FF9A00' },
            { name: 'Premiere Pro', level: 'beginner', icon: '/icons/premiere.png', color: '#9999FF' },
        ],
    },
    {
        key: 'visualization',
        programs: [
            { name: 'Enscape', level: 'advanced', icon: '/icons/enscape.png', color: '#00C48C' },
            { name: 'Twinmotion', level: 'intermediate', icon: '/icons/twinmotion.png', color: '#00BFFF' },
            { name: 'D5 Render', level: 'intermediate', icon: '/icons/d5render.png', color: '#A855F7' },
        ],
    },
];

const LEVEL_BARS: Record<Level, number> = {
    instructor: 4,
    advanced: 3,
    intermediate: 2,
    beginner: 1,
};

function LevelDots({ level, color }: { level: Level; color: string }) {
    const filled = LEVEL_BARS[level];
    return (
        <div style={styles.dots}>
            {[1, 2, 3, 4].map((n) => (
                <div
                    key={n}
                    style={{
                        ...styles.dot,
                        background: n <= filled ? color : 'rgba(255,255,255,0.1)',
                    }}
                />
            ))}
        </div>
    );
}

function ProgramCard({ prog }: { prog: Program }) {
    const t = useTranslations('architecture.levels');
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={styles.card}
        >
            <div style={{ ...styles.cardIconWrap, borderColor: `${prog.color}33` }}>
                <img
                    src={prog.icon}
                    alt={prog.name}
                    width={32}
                    height={32}
                    style={styles.cardIcon}
                    onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const fb = el.nextElementSibling as HTMLElement;
                        if (fb) fb.style.display = 'flex';
                    }}
                />
                <div
                    style={{
                        ...styles.fbLetter,
                        background: prog.color,
                        display: 'none',
                    }}
                >
                    {prog.name.charAt(0)}
                </div>
            </div>
            <p style={styles.cardName}>{prog.name}</p>
            <LevelDots level={prog.level} color={prog.color} />
            <p style={{ ...styles.cardLevel, color: `${prog.color}bb` }}>
                {t(prog.level)}
            </p>
        </motion.div>
    );
}

export default function ProgramGrid() {
    const t = useTranslations('architecture.tabs');
    const [active, setActive] = useState<Category['key']>('modeling');
    const activeCategory = CATEGORIES.find((c) => c.key === active)!;

    return (
        <div style={styles.wrapper}>
            {/* Centered tab bar */}
            <div style={styles.tabContainer}>
                <div style={styles.tabs}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActive(cat.key)}
                            className="font-ibm"
                            style={{
                                ...styles.tab,
                                color: active === cat.key ? 'rgba(240,240,240,0.88)' : 'rgba(240,240,240,0.28)',
                            }}
                        >
                            {t(cat.key)}
                            {active === cat.key && (
                                <motion.div
                                    layoutId="tab-underline"
                                    style={styles.activeBar}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={styles.grid}>
                <AnimatePresence mode="wait">
                    {activeCategory.programs.map((prog) => (
                        <ProgramCard key={`${active}-${prog.name}`} prog={prog} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        width: '100%',
    },
    tabContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '44px',
    },
    tabs: {
        display: 'flex',
        gap: '0',
    },
    tab: {
        background: 'none',
        border: 'none',
        padding: '12px 32px 14px',
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'color 0.25s ease',
        whiteSpace: 'nowrap',
        position: 'relative',
    },
    activeBar: {
        position: 'absolute',
        bottom: '-1px',
        left: '32px',
        right: '32px',
        height: '1.5px',
        background: 'rgba(240,240,240,0.55)',
        borderRadius: '2px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: '16px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    card: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        padding: '28px 16px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '11px',
        cursor: 'default',
        transition: 'background 0.25s ease, border-color 0.25s ease',
    },
    cardIconWrap: {
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '4px',
    },
    cardIcon: {
        objectFit: 'contain',
        width: '34px',
        height: '34px',
    },
    fbLetter: {
        width: '34px',
        height: '34px',
        borderRadius: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    cardName: {
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: 'rgba(240,240,240,0.82)',
        textAlign: 'center',
        fontFamily: 'IBM Plex Sans, sans-serif',
    },
    dots: {
        display: 'flex',
        gap: '5px',
    },
    dot: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        transition: 'background 0.3s ease',
    },
    cardLevel: {
        fontSize: '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: 'IBM Plex Sans, sans-serif',
        textAlign: 'center',
    },
};
