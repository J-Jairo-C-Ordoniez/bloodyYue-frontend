import { Skeleton } from "../ui/skeleton";

/**
 * Componente de carga para cards usando Skeleton
 * @param {Object} props
 * @param {string} props.variant - Tipo de skeleton ('card', 'list', 'text', 'avatar') (default: 'card')
 * @param {number} props.lines - Número de líneas para variant='text' (default: 3)
 */
export default function LoaderCard({ variant = 'card', lines = 3 }) {
    if (variant === 'card') {
        return (
            <div className="flex flex-col gap-4 w-full" role="status" aria-label="Cargando contenido">
                <Skeleton className="w-full h-48 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <span className="sr-only">Cargando contenido...</span>
            </div>
        );
    }

    if (variant === 'list') {
        return (
            <div className="flex items-center gap-3 w-full" role="status" aria-label="Cargando item">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
                <span className="sr-only">Cargando item...</span>
            </div>
        );
    }

    if (variant === 'avatar') {
        return (
            <div className="flex items-center gap-3" role="status" aria-label="Cargando perfil">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <span className="sr-only">Cargando perfil...</span>
            </div>
        );
    }

    // variant === 'text'
    return (
        <div className="space-y-2 w-full" role="status" aria-label="Cargando texto">
            {[...Array(lines)].map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
                />
            ))}
            <span className="sr-only">Cargando texto...</span>
        </div>
    );
}