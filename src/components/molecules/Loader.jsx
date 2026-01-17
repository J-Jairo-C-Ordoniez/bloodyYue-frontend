import Typography from "../atoms/Typography";
import Icon from "../atoms/Icon";

/**
 * Componente de carga con accesibilidad mejorada
 * @param {Object} props
 * @param {string} props.message - Mensaje de carga (default: 'Cargando...')
 * @param {string} props.size - Tamaño ('sm', 'md', 'lg') (default: 'md')
 * @param {boolean} props.fullPage - Si debe ocupar toda la pantalla (default: true)
 */

export default function Loader({
    message = 'Cargando...',
    size = 'md',
    fullPage = true
}) {
    const sizeClasses = {
        sm: 'w-8 h-8 border-2',
        md: 'w-12 h-12 border-4',
        lg: 'w-16 h-16 border-4'
    };

    const containerClass = fullPage
        ? "min-h-screen bg-[#0B0B0E] flex items-center justify-center"
        : "flex items-center justify-center p-8";

    return (
        <div
            className={containerClass}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="flex flex-col items-center gap-4">
                <div
                    className={`${sizeClasses[size]} border-cyan-500 border-t-transparent rounded-full animate-spin`}
                    aria-hidden="true"
                />
                <Typography variant="body" className="text-white dark:text-gray-400">
                    {message}
                </Typography>
                <span className="sr-only">{message}</span>
            </div>
        </div>
    );
}