import NextImage from 'next/image';

export default function Image({
    src,
    alt,
    width,
    height,
    variant = 'default',
    className = '',
    fill = false
}) {
    const variants = {
        default: 'rounded-lg overflow-hidden',
        avatar: 'rounded-full overflow-hidden border-2 border-white/20',
        hero: '',
        card: 'rounded-xl overflow-hidden aspect-video',
    };

    const wrapperClasses = `${variants[variant]} ${className}`;

    if (fill) {
        return (
            <div className={wrapperClasses}>
                <NextImage
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        );
    }

    return (
        <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover h-full w-full rounded-md"
        />
    );
};
