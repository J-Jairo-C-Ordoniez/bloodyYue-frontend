import { Alert, AlertDescription } from "../ui/alert";
import Icon from "../atoms/Icon";

/**
 * Componente compacto de error para cards
 * @param {Object} props
 * @param {string} props.message - Mensaje de error (default: 'Error al cargar el contenido')
 * @param {string} props.variant - Variante del alert (default: 'destructive')
 */
export default function ErrorCard({
    message = 'Error al cargar el contenido',
    variant = 'destructive'
}) {
    return (
        <Alert variant={variant} className="h-full flex items-center justify-center bg-amber-500 w-fit text-white animate-pulse">
            <Icon name="CircleAlert" size={30} />
            <AlertDescription className="text-sm">
                {message}
            </AlertDescription>
        </Alert>
    );
}