import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import HeroCards from '@/components/HeroCards';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
    const t = useTranslations();

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .home-map {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url('/istanbul.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    opacity: 0.15;
                    filter: invert(1);
                    mix-blend-mode: screen;
                    pointer-events: none;
                    z-index: 0;
                }
                @media (max-width: 768px) {
                    .home-map {
                        /* Rotate 90deg and adjust dimensions for vertical aspect ratio */
                        width: 100vh;
                        height: 100vw;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(90deg);
                    }
                }
            `}} />
            <div className="home-map" />
            <main style={styles.main}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Navbar />
                    <HeroCards />
                    <ContactSection />
                </div>
            </main>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: '100vh',
    },
};
