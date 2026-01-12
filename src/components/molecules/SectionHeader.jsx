import Typography from '../atoms/Typography';

export default function SectionHeader({ title, subtitle, className = '', align = 'center' }) {
    const alignmentClasses =
        align === 'left' ? 'text-left items-start' :
            align === 'right' ? 'text-right items-end' :
                'text-center items-center';

    return (
        <div className={`flex flex-col gap-2 mb-8 ${alignmentClasses} ${className}`}>
            <Typography variant="h2" className="uppercase text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="subtitle" className="max-w-2xl text-gray-400">
                    {subtitle}
                </Typography>
            )}
            <div className="w-24 h-1 bg-blue-500 rounded-full mt-2 opacity-80" />
        </div>
    );
};
