import { useTranslations } from 'next-intl';
import ArchitectureHeader from '@/components/ArchitectureHeader';
import SoftwareTicker from '@/components/SoftwareTicker';
import ProgramGrid from '@/components/ProgramGrid';
import GraduationCountdown from '@/components/GraduationCountdown';

export default function ArchitecturePage() {
    const t = useTranslations('architecture');

    return (
        <main style={styles.main}>
            <ArchitectureHeader />

            {/* About section — constrained width, centered */}
            <div style={styles.aboutWrap}>
                <p className="font-ibm" style={styles.about}>
                    {t('about')}
                </p>
            </div>

            {/* Ticker — full viewport width, no container */}
            <section style={styles.tickerSection}>
                <SoftwareTicker />
            </section>

            {/* Program grid — constrained */}
            <div style={styles.gridWrap}>
                <ProgramGrid />
            </div>

            {/* Graduation countdown */}
            <div style={styles.countdownWrap}>
                <div style={styles.countdownDivider} />
                <GraduationCountdown />
            </div>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    aboutWrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: '140px 48px 80px',
    },
    about: {
        fontSize: 'clamp(13px, 1.1vw, 15px)',
        lineHeight: 1.9,
        color: 'rgba(240,240,240,0.5)',
        fontWeight: 300,
        letterSpacing: '0.01em',
        maxWidth: '620px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
    },
    /* Full viewport width — breaks out of any container */
    tickerSection: {
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: '0',
    },
    gridWrap: {
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        padding: '80px 48px 60px',
    },
    countdownWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    countdownDivider: {
        width: '40px',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
    },
};
