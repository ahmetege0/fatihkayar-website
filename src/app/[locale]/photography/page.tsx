import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function PhotographyPage() {
    const t = useTranslations('photography');
    const locale = useLocale();

    return (
        <main style={styles.main}>
            <Link href={`/${locale}`} style={styles.back}>
                {t('back')}
            </Link>
            <h1 className="font-helvetica" style={styles.title}>
                {t('title')}
            </h1>
            <p className="font-ibm" style={styles.status}>
                {t('status')}
            </p>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
    },
    back: {
        position: 'fixed',
        top: '32px',
        left: '48px',
        color: 'rgba(240,240,240,0.35)',
        textDecoration: 'none',
        fontSize: '13px',
        letterSpacing: '0.08em',
        fontFamily: 'IBM Plex Sans, sans-serif',
        transition: 'color 0.2s ease',
    },
    title: {
        fontSize: 'clamp(32px, 5vw, 64px)',
        letterSpacing: '0.18em',
        color: 'rgba(240,240,240,0.88)',
        textAlign: 'center',
    },
    status: {
        fontSize: '14px',
        letterSpacing: '0.18em',
        color: 'rgba(240,240,240,0.3)',
        textTransform: 'uppercase',
    },
};
