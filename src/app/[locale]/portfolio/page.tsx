import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function PortfolioPage({ params }: Props) {
    const { locale } = await params;
    return <PortfolioContent locale={locale} />;
}

function PortfolioContent({ locale }: { locale: string }) {
    const t = useTranslations('portfolio');

    return (
        <main style={styles.main}>
            <div style={styles.container}>
                <p style={styles.subtitle} className="font-ibm">
                    {t('title')}
                </p>
                <h1 className="font-helvetica" style={styles.title}>
                    {t('status')}
                </h1>
                <div style={styles.line} />
                <Link href={`/${locale}`} style={styles.back} className="font-ibm">
                    {t('back')}
                </Link>
            </div>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
    },
    subtitle: {
        fontSize: '12px',
        letterSpacing: '0.3em',
        color: 'rgba(240,240,240,0.35)',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 'clamp(36px, 6vw, 80px)',
        letterSpacing: '0.08em',
        color: 'rgba(240,240,240,0.85)',
    },
    line: {
        width: '40px',
        height: '1px',
        background: 'rgba(240,240,240,0.2)',
    },
    back: {
        fontSize: '12px',
        letterSpacing: '0.15em',
        color: 'rgba(240,240,240,0.4)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
    },
};
