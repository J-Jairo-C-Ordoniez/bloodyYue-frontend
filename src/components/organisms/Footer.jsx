import SocialBar from '../molecules/SocialBar';
import ContactItem from '../molecules/ContactItem';
import Typography from '../atoms/Typography';

export default function Footer({ email, redes }) {
    return (
        <footer className="py-12 px-4 bg-gray-950 border-t border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex flex-col items-center md:items-start gap-4">
                    <Typography variant="h3" className="text-white">Let's Connect</Typography>
                    <ContactItem
                        icon="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                        label="Email Me"
                        value={email}
                        href={`mailto:${email}`}
                    />
                </div>

                <div className="flex flex-col items-center md:items-end gap-4">
                    <Typography variant="subtitle" className="text-gray-400">Follow Me</Typography>
                    <SocialBar redes={redes} />
                </div>

            </div>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <Typography variant="small" className="text-gray-600">
                    © {new Date().getFullYear()} All rights reserved.
                </Typography>
            </div>
        </footer>
    );
};
