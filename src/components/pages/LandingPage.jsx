import HeaderSection from '../organisms/HeaderSection';
import HeroSection from '../organisms/HeroSection';
import AboutSection from '../organisms/AboutSection';
import WorkSection from '../organisms/WorkSection';
import Footer from '../organisms/Footer';

export default function LandingPage({ data }) {
    if (!data) return null;

    const {
        settingId,
        title,
        subtitle,
        contentHero,
        abaut,
        work,
        email,
        redes
    } = data;

    return (
        <div id={settingId} className="bg-foreground dark:bg-background min-h-screen">
            <main>
                <HeroSection
                    title={title}
                    subtitle={subtitle}
                    abaut={abaut}
                    image={contentHero}
                />

                <AboutSection content={abaut} />

                <WorkSection content={work} />
            </main>

            <div id="contact">
                <Footer email={email} redes={redes} />
            </div>
        </div>
    );
};
