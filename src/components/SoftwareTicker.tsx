'use client';

import { useEffect, useRef } from 'react';

type Software = {
    id: string;
    name: string;
    icon: string;
    color: string;
};

const SOFTWARE: Software[] = [
    { id: 'sketchup', name: 'SketchUp', icon: '/icons/sketchup.png', color: '#E83A3A' },
    { id: 'autocad', name: 'AutoCAD', icon: '/icons/autocad.png', color: '#CC2222' },
    { id: 'revit', name: 'Revit', icon: '/icons/revit.png', color: '#4A90D9' },
    { id: 'rhino', name: 'Rhino', icon: '/icons/rhino.png', color: '#888888' },
    { id: 'grasshopper', name: 'Grasshopper', icon: '/icons/grasshopper.png', color: '#5DA832' },
    { id: '3dsmax', name: '3ds Max', icon: '/icons/3dsmax.png', color: '#0696D7' },
    { id: 'photoshop', name: 'Photoshop', icon: '/icons/photoshop.png', color: '#31A8FF' },
    { id: 'lightroom', name: 'Lightroom', icon: '/icons/lightroom.png', color: '#3EB6F4' },
    { id: 'illustrator', name: 'Illustrator', icon: '/icons/illustrator.png', color: '#FF9A00' },
    { id: 'premiere', name: 'Premiere Pro', icon: '/icons/premiere.png', color: '#9999FF' },
    { id: 'enscape', name: 'Enscape', icon: '/icons/enscape.png', color: '#00C48C' },
    { id: 'twinmotion', name: 'Twinmotion', icon: '/icons/twinmotion.png', color: '#00BFFF' },
    { id: 'd5render', name: 'D5 Render', icon: '/icons/d5render.png', color: '#A855F7' },
    { id: 'Suapp', name: 'Suapp', icon: '/icons/suapp.png', color: '#F16529' },
];

// Triple-duplicate for seamless infinite feel
const ITEMS = [...SOFTWARE, ...SOFTWARE, ...SOFTWARE];

function Pill({ sw }: { sw: Software }) {
    return (
        <div style={styles.pill} className="ticker-pill">
            {/* Icon */}
            <div style={{ ...styles.iconWrap, borderColor: `${sw.color}44` }} className="ticker-icon-wrap">
                <img
                    src={sw.icon}
                    alt={sw.name}
                    width={20}
                    height={20}
                    style={styles.iconImg}
                    className="ticker-icon"
                    onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const fb = el.nextElementSibling as HTMLElement;
                        if (fb) fb.style.display = 'flex';
                    }}
                />
                <div style={{ ...styles.fallback, background: sw.color, display: 'none' }}>
                    {sw.name.charAt(0)}
                </div>
            </div>
            {/* Name */}
            <span style={styles.name} className="ticker-name">{sw.name}</span>
        </div>
    );
}

export default function SoftwareTicker() {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let req: number;
        let pos = 0;
        const speed = 0.6;

        const animate = () => {
            pos -= speed;
            // Reset at 1/3 of total width (one set of SOFTWARE items)
            if (Math.abs(pos) >= track.scrollWidth / 3) {
                pos = 0;
            }
            track.style.transform = `translateX(${pos}px)`;
            req = requestAnimationFrame(animate);
        };

        req = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(req);
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .ticker-pill { padding: 4px 12px 4px 4px !important; gap: 8px !important; }
                    .ticker-icon-wrap { width: 24px !important; height: 24px !important; border-radius: 8px !important; }
                    .ticker-icon { width: 24px !important; height: 24px !important; }
                    .ticker-name { font-size: 12px !important; }
                    .ticker-fade { width: 40px !important; }
                }
            `}} />
            <div style={styles.wrapper}>
                {/* Fade edges */}
                <div style={styles.fadeLeft} className="ticker-fade" />
                <div style={styles.fadeRight} className="ticker-fade" />
                {/* Infinite track */}
                <div style={styles.track} ref={trackRef}>
                    {ITEMS.map((sw, i) => (
                        <Pill key={`${sw.id}-${i}`} sw={sw} />
                    ))}
                </div>
            </div>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: '28px 0',
    },
    fadeLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '80px',
        background: 'linear-gradient(to right, #000000, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
    },
    fadeRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '80px',
        background: 'linear-gradient(to left, #000000, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
    },
    track: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
        willChange: 'transform',
        whiteSpace: 'nowrap',
        width: 'max-content',
    },
    pill: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
        padding: '4px 20px 4px 4px',
        cursor: 'default',
    },
    iconWrap: {
        width: '30px',
        height: '30px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
    },
    iconImg: {
        objectFit: 'contain',
        width: '32px',
        height: '32px',
    },
    fallback: {
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        flexShrink: 0,
    },
    name: {
        fontSize: '14px',
        letterSpacing: '0.05em',
        color: 'rgba(240,240,240,0.6)',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeight: 400,
    },
};
