export default function Icon({
    path,
    viewBox = "0 0 24 24",
    size = 24,
    color = "currentColor",
    className = ""
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-200 ${className}`}
        >
            {/* If path is a string (d attribute), render a path. 
          If it serves as children (complex svg), render children.
          But for simplicity in atom, let's assume path prop is the d string or children is passed.
      */}
            <path d={path} />
        </svg>
    );
};
