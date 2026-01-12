import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';

export default function ContactItem({ icon, label, value, href, className = '' }) {
    const content = (
        <div className={`flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all ${className}`}>
            <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                <Icon path={icon} size={20} />
            </div>
            <div>
                {label && <Typography variant="caption" className="text-gray-400 mb-0.5">{label}</Typography>}
                <Typography variant="body" className="font-medium text-white">{value}</Typography>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block hover:no-underline">
                {content}
            </a>
        );
    }

    return content;
};
