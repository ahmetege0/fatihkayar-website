'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

type SectionKey = 'architecture' | 'academy' | 'photography';

type Props = {
    id: SectionKey;
    hashLabel: string;
};

export default function SectionBlock({ id, hashLabel }: Props) {
    const t = useTranslations();

    return (
        <section id={id} style={styles.section}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                style={styles.inner}
            >
                <p className="font-ibm" style={styles.hash}>
                    {hashLabel}
                </p>
                <p className="font-ibm" style={styles.coming}>
                    {t('comingSoon')}
                </p>
            </motion.div>
        </section>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '80px 48px',
    },
    inner: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
    },
    hash: {
        fontSize: 'clamp(28px, 5vw, 64px)',
        fontWeight: 300,
        color: 'rgba(240,240,240,0.12)',
        letterSpacing: '0.04em',
        fontStyle: 'italic',
        lineHeight: 1,
    },
    coming: {
        fontSize: '13px',
        letterSpacing: '0.25em',
        color: 'rgba(240,240,240,0.3)',
        textTransform: 'uppercase',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '8px 20px',
        borderRadius: '2px',
    },
};
