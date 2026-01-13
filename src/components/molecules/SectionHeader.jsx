import Typography from '../atoms/Typography';
import Image from "../atoms/Image";

export default function SectionHeader({ title, subtitle, content, className = '', align = 'center' }) {
    const alignmentClasses =
        align === 'left' ? 'text-left items-start' :
            align === 'right' ? 'text-right items-end' :
                'text-center items-center';

    return (
        <header className={`flex flex-col gap-2 mb-8 ${alignmentClasses} ${className}`}>
            <div className="relative w-full aspect-square max-w-[120px] mx-auto lg:ml-auto p-1 bg-linear-to-r from-blue-400 to-purple-600 rounded-full">
                <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                        src={content}
                        alt={title}
                        width={120}
                        height={120}
                        variant="avatar"
                    />
                </div>
            </div>

            <Typography variant="caption" className="uppercase text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
                {title}
            </Typography>

            <Typography variant="subtitle" className="max-w-2xl text-gray-400">
                {subtitle}
            </Typography>
        </header>
    );
};
