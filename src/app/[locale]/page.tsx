import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import HeroCards from '@/components/HeroCards';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
    const t = useTranslations();

    return (
        <main style={styles.main}>
            <Navbar />
            <HeroCards />
            <ContactSection />
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
    },
};
