'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

const LINKEDIN_URL =
    'https://www.linkedin.com/in/fatihbu%C4%9Frakayar/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B4%2Fbq%2B%2BaqTkGGpQfQf7iZEA%3D%3D';
const UNSPLASH_URL = 'https://unsplash.com/@fatihkayar';

type CircleButton = {
    id: string;
    label: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    imgSrc?: string;
};

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

function UnsplashIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
                <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </>
            ) : (
                <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </>
            )}
        </svg>
    );
}

export default function Navbar() {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleLocale = () => {
        const newLocale = locale === 'tr' ? 'en' : 'tr';
        // Replace current locale in pathname
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    const buttons: CircleButton[] = [
        {
            id: 'linkedin',
            label: t('buttons.linkedin'),
            href: LINKEDIN_URL,
            target: '_blank',
            icon: <LinkedInIcon />,
        },
        {
            id: 'portfolio',
            label: t('buttons.portfolio'),
            href: `/${locale}/portfolio`,
            icon: <PortfolioIcon />,
        },
        {
            id: 'unsplash',
            label: t('buttons.unsplash'),
            href: UNSPLASH_URL,
            target: '_blank',
            icon: <UnsplashIcon />,
        },
        {
            id: 'photography',
            label: t('buttons.photography'),
            href: `/${locale}/photography`,
            icon: <CameraIcon />,
        },
    ];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 768px) {
                    .nav-container {
                        padding: 16px 20px !important;
                        flex-wrap: wrap;
                        background: ${menuOpen ? 'rgba(0,0,0,0.85)' : 'transparent'};
                        backdrop-filter: ${menuOpen ? 'blur(10px)' : 'none'};
                        -webkit-backdrop-filter: ${menuOpen ? 'blur(10px)' : 'none'};
                        border-bottom: ${menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none'};
                    }
                    .nav-name {
                        font-size: 24px !important;
                        letter-spacing: 0.12em !important;
                    }
                    .nav-right {
                        gap: 12px !important;
                    }
                    .nav-circle {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    .nav-circle svg {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    .nav-circle img {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    .nav-lang {
                        font-size: 11px !important;
                        padding: 4px !important;
                        letter-spacing: 0.08em !important;
                    }
                    .desktop-icons { display: none !important; }
                    .mobile-toggle { display: flex !important; margin-left: auto; background: none; border: none; color: #fff; cursor: pointer; padding: 6px; }
                    .mobile-menu { 
                        display: flex !important; 
                        width: 100%; 
                        justify-content: center; 
                        gap: 16px; 
                        margin-top: 16px; 
                        padding-top: 16px; 
                        border-top: 1px solid rgba(255,255,255,0.1); 
                        animation: slideDown 0.3s ease;
                    }
                }
                @media (min-width: 769px) {
                    .desktop-icons { display: flex !important; gap: 14px; align-items: center; }
                    .mobile-toggle { display: none !important; }
                    .mobile-menu { display: none !important; }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
            <nav style={styles.nav} className="nav-container">
                <div style={styles.nameWrap}>
                    {/* Istanbul map moved to global CSS */}
                    <Link href={`/${locale}`} style={styles.nameLink}>
                        <span className="font-helvetica nav-name" style={styles.name}>
                            {t('nav.name')}
                        </span>
                    </Link>
                </div>

                {/* RIGHT: Circle buttons + lang toggle */}
                <div style={styles.rightSection} className="nav-right">
                    
                    {/* Desktop icons */}
                    <div className="desktop-icons">
                        {buttons.map((btn) => {
                            const content = btn.imgSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={btn.imgSrc} alt={btn.label} style={styles.navImgIcon} />
                            ) : btn.icon;

                            return (
                                <div
                                    key={btn.id}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setTooltip(btn.id)}
                                    onMouseLeave={() => setTooltip(null)}
                                >
                                    {btn.disabled ? (
                                        <button style={{ ...styles.circle, ...styles.circleDisabled }} className="nav-circle">
                                            {content}
                                        </button>
                                    ) : btn.target === '_blank' ? (
                                        <a href={btn.href} target="_blank" rel="noopener noreferrer" style={styles.circle as React.CSSProperties} className="nav-circle">
                                            {content}
                                        </a>
                                    ) : (
                                        <Link href={btn.href!} style={styles.circle as React.CSSProperties} className="nav-circle">
                                            {content}
                                        </Link>
                                    )}
                                    {tooltip === btn.id && (
                                        <div style={styles.tooltip}>{btn.label}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Language switcher */}
                    <button onClick={toggleLocale} style={styles.langBtn} className="font-ibm nav-lang">
                        <span style={{ opacity: locale === 'tr' ? 1 : 0.35 }}>TR</span>
                        <span style={styles.langDivider}>|</span>
                        <span style={{ opacity: locale === 'en' ? 1 : 0.35 }}>EN</span>
                    </button>
                    
                    {/* Hamburger Toggle */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-toggle">
                        <HamburgerIcon isOpen={menuOpen} />
                    </button>
                </div>

                {/* Mobile Menu Bar */}
                {menuOpen && (
                    <div className="mobile-menu">
                        {buttons.map((btn) => {
                            const content = btn.imgSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={btn.imgSrc} alt={btn.label} style={styles.navImgIcon} />
                            ) : btn.icon;

                            return (
                                <div key={btn.id}>
                                    {btn.disabled ? (
                                        <button style={{ ...styles.circle, ...styles.circleDisabled }} className="nav-circle">
                                            {content}
                                        </button>
                                    ) : btn.target === '_blank' ? (
                                        <a href={btn.href} target="_blank" rel="noopener noreferrer" style={styles.circle as React.CSSProperties} className="nav-circle">
                                            {content}
                                        </a>
                                    ) : (
                                        <Link href={btn.href!} style={styles.circle as React.CSSProperties} className="nav-circle" onClick={() => setMenuOpen(false)}>
                                            {content}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </nav>
        </>
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
    },
    nameWrap: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto',
    },
    nameLink: {
        textDecoration: 'none',
        position: 'relative',
        zIndex: 1,
    },
    name: {
        fontSize: 'clamp(18px, 2.2vw, 28px)',
        letterSpacing: '0.12em',
        color: 'var(--text-primary)',
        userSelect: 'none',
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
    navImgIcon: {
        width: '22px',
        height: '22px',
        objectFit: 'contain',
        filter: 'brightness(0) invert(1)',
        opacity: 0.8,
    },
    circleDisabled: {
        opacity: 0.3,
        cursor: 'not-allowed',
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
