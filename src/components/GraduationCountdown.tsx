'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

// Graduation: June 25, 2027 at 00:00:00 local time
const GRADUATION = new Date('2027-06-25T00:00:00');

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function calcTimeLeft(): TimeLeft {
    const diff = GRADUATION.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}

function pad(n: number) {
    return String(n).padStart(2, '0');
}

type UnitProps = {
    value: number;
    label: string;
};

function Unit({ value, label }: UnitProps) {
    return (
        <div style={styles.unit}>
            <span className="font-ibm gc-number" style={styles.number}>
                {pad(value)}
            </span>
            <span className="font-ibm gc-label" style={styles.label}>
                {label}
            </span>
        </div>
    );
}

export default function GraduationCountdown() {
    const locale = useLocale();
    const [time, setTime] = useState<TimeLeft>(calcTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calcTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const labels =
        locale === 'tr'
            ? { days: 'gün', hours: 'saat', minutes: 'dakika', seconds: 'saniye', heading: 'mimar olmama kalan süre', date: '25 Haziran 2027' }
            : { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds', heading: 'until I become an architect', date: 'June 25, 2027' };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 768px) {
                    .gc-section { padding: 60px 20px 80px !important; }
                    .gc-row { gap: 16px !important; }
                    .gc-number { font-size: clamp(28px, 6vw, 42px) !important; }
                    .gc-label { font-size: 8px !important; letter-spacing: 0.1em !important; }
                    .gc-sep { font-size: clamp(20px, 4vw, 30px) !important; padding-top: 2px !important; }
                    .gc-heading { font-size: 9px !important; letter-spacing: 0.15em !important; }
                }
            `}} />
            <section style={styles.section} className="gc-section">
                {/* Heading */}
                <p className="font-ibm gc-heading" style={styles.heading}>
                    {labels.heading}
                </p>

                {/* Counter row */}
                <div style={styles.row} className="gc-row">
                    <Unit value={time.days} label={labels.days} />
                    <Separator />
                    <Unit value={time.hours} label={labels.hours} />
                    <Separator />
                    <Unit value={time.minutes} label={labels.minutes} />
                    <Separator />
                    <Unit value={time.seconds} label={labels.seconds} />
                </div>

                {/* Date note */}
                <p className="font-ibm" style={styles.dateNote}>
                    {labels.date}
                </p>
            </section>
        </>
    );
}

function Separator() {
    return <span style={styles.sep} className="gc-sep">:</span>;
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '80px 48px 120px',
    },
    heading: {
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(240,240,240,0.28)',
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '32px',
    },
    unit: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    number: {
        fontSize: 'clamp(42px, 6vw, 88px)',
        fontWeight: 300,
        letterSpacing: '0.04em',
        color: 'rgba(240,240,240,0.82)',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
    },
    label: {
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(240,240,240,0.25)',
    },
    sep: {
        fontSize: 'clamp(30px, 4vw, 60px)',
        fontWeight: 200,
        color: 'rgba(240,240,240,0.15)',
        lineHeight: 1,
        paddingTop: '4px',
        fontFamily: 'IBM Plex Sans, sans-serif',
        userSelect: 'none',
    },
    dateNote: {
        fontSize: '11px',
        letterSpacing: '0.14em',
        color: 'rgba(240,240,240,0.18)',
    },
};
