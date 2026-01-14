import Icon from '../atoms/Icon';

const socialIcons = {
    facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    twitter: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4.1.7 8.3-2.3 8.3-2.3-4.2 0-5.8-3-5.8-3 .7 0 1.6.4 1.6.4-4.2-.7-5.1-4.8-5.1-4.8.7.4 1.2.4 1.2.4-1.9-1.3-2.3-4.5-2.3-4.5 1.9 1.1 4.6 1.8 4.6 1.8-1.9-2.5.4-5.6.4-5.6 1.9 2.1 6.6 2.3 6.6 2.3-.5-2 2-4 4.3-3.6 1.4.3 2.1 1.4 2.1 1.4.9-.2 2.1-.5 2.1-.5-.2 1-1.2 1.9-1.2 1.9.9-.1 1.9-.5 1.9-.5-.5 1-1.4 1.6-1.4 1.6z",
    instagram: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z",
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
};

export default function SocialBar({ redes, className = '', itemClassName = 'p-2 bg-white/5 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 text-white' }) {

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {values.map((link, index) => {
                const name = link.name?.toLowerCase() || link.platform?.toLowerCase() || '';
                const url = link.url || link.link || '#';
                const iconPath = socialIcons[name] || socialIcons.github; // Default to github if unknown

                return (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClassName}
                        aria-label={name}
                    >
                        <Icon path={iconPath} size={20} />
                    </a>
                );
            })}
        </div>
    );
};
