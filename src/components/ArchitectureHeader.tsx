'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const LINKEDIN_URL =
    'https://www.linkedin.com/in/fatihbu%C4%9Frakayar/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B4%2Fbq%2B%2BaqTkGGpQfQf7iZEA%3D%3D';

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function PortfolioIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </svg>
    );
}

function ArrowLeftIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
    );
}

export default function ArchitectureHeader() {
    const t = useTranslations('architecture');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [tooltip, setTooltip] = useState<string | null>(null);

    const toggleLocale = () => {
        const newLocale = locale === 'tr' ? 'en' : 'tr';
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <nav style={styles.nav}>
            {/* LEFT: Back arrow + title + divider + CV text */}
            <div style={styles.leftGroup}>
                <Link href={`/${locale}`} style={styles.backBtn} title="Geri">
                    <ArrowLeftIcon />
                </Link>
                <span className="font-ibm" style={styles.title}>
                    {t('title')}
                </span>
            </div>

            {/* RIGHT: CV text + LinkedIn + Portfolio + TR|EN */}
            <div style={styles.rightSection}>
                <Link href={`/${locale}/cv`} className="font-helvetica" style={styles.cv}>
                    {t('cv')}
                </Link>
                {/* LinkedIn */}
                <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setTooltip('linkedin')}
                    onMouseLeave={() => setTooltip(null)}
                >
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={styles.circle as React.CSSProperties}>
                        <LinkedInIcon />
                    </a>
                    {tooltip === 'linkedin' && <div style={styles.tooltip}>LinkedIn</div>}
                </div>

                {/* Adobe Portfolio */}
                <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setTooltip('portfolio')}
                    onMouseLeave={() => setTooltip(null)}
                >
                    <Link href={`/${locale}/portfolio`} style={styles.circle as React.CSSProperties}>
                        <PortfolioIcon />
                    </Link>
                    {tooltip === 'portfolio' && <div style={styles.tooltip}>Adobe Portfolio</div>}
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
        gap: '18px',
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
    title: {
        fontSize: 'clamp(18px, 2.2vw, 28px)',
        letterSpacing: '0.12em',
        color: 'rgba(240,240,240,0.88)',
        fontWeight: 600,
        userSelect: 'none',
    },
    divider: {
        color: 'rgba(240,240,240,0.18)',
        fontSize: '20px',
        fontWeight: 100,
    },
    cv: {
        fontSize: 'clamp(13px, 1.2vw, 17px)',
        letterSpacing: '0.14em',
        color: 'rgba(240,240,240,0.6)',
        textDecoration: 'none',
        fontWeight: 700,
        transition: 'color 0.2s ease',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        pointerEvents: 'auto',
    },
    circle: {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.22)',
        background: 'rgba(255,255,255,0.04)',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.25s ease, border-color 0.25s ease, background 0.25s ease',
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
