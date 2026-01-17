export default function Video({
    src,
    alt,
    width,
    height,
    controls = false,
    className = '',
    ...props
}) {
    return (
        <video
            src={src}
            alt={alt}
            width={width}
            height={height}
            controls={controls}
            className={className}
            {...props}
        />
    );
}