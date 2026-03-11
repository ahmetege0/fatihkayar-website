import { useTranslations } from 'next-intl';
import AcademyHeader from '@/components/AcademyHeader';

export default function AcademyPage() {
    const t = useTranslations('academy');

    return (
        <main style={styles.main}>
            <AcademyHeader />

            {/* Coming Soon body */}
            <div style={styles.body}>
                <p className="font-ibm" style={styles.status}>
                    {t('status')}
                </p>
            </div>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        fontSize: '13px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(240,240,240,0.22)',
    },
};
