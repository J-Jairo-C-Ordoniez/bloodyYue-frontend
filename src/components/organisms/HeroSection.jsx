import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import HeaderSection from './HeaderSection';

export default function HeroSection({ title, subtitle, abaut, image }) {
    return (
        <section className="relative min-h-screen overflow-hidden px-4">
            <div className="absolute inset-0 w-full h-full">
                <img src={image} alt="Hero Background" variant="hero" 
                className='object-cover w-full h-full opacity-10 fi grayscale-40' />
            </div>

            <HeaderSection 
                title={title}
            />

            {/* <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-in-up">
                <Typography variant="caption" className="text-blue-400 mb-2">
                    Software Developer & Designer
                </Typography>

                <Typography variant="h1" className="bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-gray-400">
                    {title}
                </Typography>

                <Typography variant="subtitle" className="text-gray-300 max-w-2xl">
                    {subtitle}
                </Typography>

                <div className="flex gap-4 mt-8">
                    <Button variant="primary" size="large">
                        Get in Touch
                    </Button>
                    <Button variant="secondary" size="large">
                        View Work
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
                <Icon path="M12 5v14M19 12l-7 7-7-7" size={32} />
            </div> */}
        </section>
    );
};
