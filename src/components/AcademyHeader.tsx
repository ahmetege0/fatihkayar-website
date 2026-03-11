'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

function ArrowLeftIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
    );
}

export default function AcademyHeader() {
    const t = useTranslations('academy');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const newLocale = locale === 'tr' ? 'en' : 'tr';
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    const [tooltip, setTooltip] = useState<string | null>(null);

    return (
        <nav style={styles.nav}>
            {/* LEFT: back + Yeditepe logo + title */}
            <div style={styles.leftGroup}>
                <Link href={`/${locale}`} style={styles.backBtn} title="Geri">
                    <ArrowLeftIcon />
                </Link>

                <span className="font-ibm" style={styles.title}>
                    {t('title')}
                </span>
            </div>

            {/* RIGHT: Yeditepe PDF + TR|EN */}
            <div style={styles.rightSection}>
                {/* Yeditepe PDF link */}
                <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setTooltip('pdf')}
                    onMouseLeave={() => setTooltip(null)}
                >
                    <a
                        href="/yeditepe.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.iconLink}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/yeditepe.png" alt="Yeditepe" style={styles.circleIcon} />
                    </a>
                    {tooltip === 'pdf' && <div style={styles.tooltip}>Yeditepe Üniversitesi</div>}
                </div>

                {/* TR | EN */}
                <button onClick={toggleLocale} style={styles.langBtn} className="font-ibm">
                    <span style={{ opacity: locale === 'tr' ? 1 : 0.35 }}>TR</span>
                    <span style={styles.langDivider}>|</span>
                    <span style={{ opacity: locale === 'en' ? 1 : 0.35 }}>EN</span>
                </button>
            </div>
        </nav>
    );
}

const styles: Record<string, React.CSSProperties> = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 48px',
        pointerEvents: 'none',
        background: 'transparent',
    },
    leftGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        pointerEvents: 'auto',
    },
    backBtn: {
        color: 'rgba(240,240,240,0.35)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s ease',
        lineHeight: 1,
    },
    yeditepeIcon: {
        width: '28px',
        height: '28px',
        objectFit: 'contain',
        opacity: 0.75,
        filter: 'brightness(0) invert(1)',
    },
    title: {
        fontSize: 'clamp(18px, 2.2vw, 28px)',
        letterSpacing: '0.12em',
        color: 'rgba(240,240,240,0.88)',
        fontWeight: 600,
        userSelect: 'none',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        pointerEvents: 'auto',
    },
    iconLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        padding: '10px',
    },
    circleIcon: {
        width: '22px',
        height: '22px',
        objectFit: 'contain',
        filter: 'brightness(0) invert(1)',
        opacity: 0.8,
    },
    tooltip: {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(20,20,20,0.92)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'var(--text-primary)',
        fontSize: '11px',
        letterSpacing: '0.08em',
        padding: '4px 10px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        fontFamily: 'IBM Plex Sans, sans-serif',
        pointerEvents: 'none',
    },
    langBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '12px',
        letterSpacing: '0.12em',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '6px 10px',
        marginLeft: '6px',
    },
    langDivider: {
        opacity: 0.25,
        fontSize: '10px',
    },
};
