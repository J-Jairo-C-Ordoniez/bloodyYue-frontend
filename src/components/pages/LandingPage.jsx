import HeaderSection from '../organisms/HeaderSection';
import HeroSection from '../organisms/HeroSection';
import AboutSection from '../organisms/AboutSection';
import WorkSection from '../organisms/WorkSection';
import CommissionSection from '../organisms/CommisionSection';
import TestimonialsSection from '../organisms/TestimonialsSection';
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
            <HeaderSection title={title} />
            <main>
                <HeroSection
                    subtitle={subtitle}
                    abaut={abaut}
                />

                <AboutSection
                    abaut={abaut}
                    work={work}
                    content={contentHero}
                />

                <WorkSection />

                <CommissionSection />

                <TestimonialsSection />
            </main>

            {/* <Footer email={email} redes={redes} /> */}
        </div>
    );
};
