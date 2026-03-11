import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function CVPage({ params }: Props) {
    const { locale } = await params;
    return <CVContent locale={locale} />;
}

function CVContent({ locale }: { locale: string }) {
    const t = useTranslations('cv');

    return (
        <main style={styles.main}>
            {/* Overlay back button */}
            <Link href={`/${locale}/architecture`} style={styles.backBtn} className="font-ibm">
                {t('back')}
            </Link>
            
            <object 
                data="/FatihBuğraKayar_CV.pdf#toolbar=0" 
                type="application/pdf"
                style={styles.iframe}
            >
                <iframe 
                    src="/FatihBuğraKayar_CV.pdf#toolbar=0" 
                    style={styles.iframe}
                    title="CV"
                >
                    <p>It appears your browser does not have a PDF plugin. <a href="/FatihBuğraKayar_CV.pdf">Click here to download the PDF file.</a></p>
                </iframe>
            </object>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
    },
    backBtn: {
        position: 'absolute',
        top: '24px',
        left: '24px',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '8px 16px',
        borderRadius: '8px',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '12px',
        letterSpacing: '0.1em',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    }
};
