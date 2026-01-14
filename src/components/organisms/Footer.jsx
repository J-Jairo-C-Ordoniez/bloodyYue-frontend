import SocialBar from '../molecules/SocialBar';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';

export default function Footer({ email, redes }) {
    return (
        <footer className="py-16 px-4 bg-black/50">
            <div className="container max-w-7xl mx-auto">
                <article className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <Typography variant="h3" className="font-bold text-gray-900">
                                Bloody<span className="text-red-500">Yue</span>
                            </Typography>
                            <Typography variant="body" className="text-gray-600 max-w-sm">
                                Creando arte digital con pasión. <br />
                                Gracias por apoyar mi trabajo.
                            </Typography>
                        </div>

                        {/* <div className="flex gap-4">
                            <SocialBar redes={redes} className="text-gray-600" itemClassName="bg-gray-100 hover:bg-gray-200 text-gray-700" />
                        </div> */}
                    </div>

                    <div className="flex flex-col gap-6 md:pl-12">
                        <Typography variant="h5" className="font-bold text-gray-300">
                            Menú
                        </Typography>
                        <nav className="flex flex-col gap-3">
                            {['Home', 'Portfolio', 'Commissions', 'Terms of Service'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-gray-500 hover:text-gray-200 transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Typography variant="h5" className="font-bold text-gray-300">
                            Contacto
                        </Typography>
                        <div className="flex flex-col gap-3">
                            <a href={`mailto:${email}`} className="text-gray-500 hover:text-gray-200 transition-colors">
                                <Icon name="Mail" size={20} />
                            </a>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-gray-500">Commissions Open</span>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
                    <Typography variant="small" className="text-gray-400">
                        © {new Date().getFullYear()} Bloody Yue. All rights reserved.
                    </Typography>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-gray-400 hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-gray-600">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
