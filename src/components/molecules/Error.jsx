import { Alert, AlertDescription, AlertTitle } from "./Alert";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
import Icon from "../atoms/Icon";

/**
 * Componente de error mejorado con accesibilidad completa
 * @param {Object} props
 * @param {string} props.message - Mensaje de error a mostrar
 * @param {string} props.typeError - Tipo de error (default: '500')
 * @param {string} props.variant - Variante del error ('default', 'destructive', 'warning', 'info')
 * @param {boolean} props.fullPage - Si debe ocupar toda la pantalla (default: true)
 * @param {string} props.actionText - Texto del botón de acción
 * @param {Function} props.onAction - Callback para el botón de acción
 * @param {boolean} props.showHomeLink - Mostrar enlace a home (default: true)
 */
export default function Error({
    message = 'Ha ocurrido un error',
    typeError = '500',
    variant = 'destructive',
    fullPage = true,
    actionText,
    onAction,
    showHomeLink = true
}) {
    const containerClass = fullPage
        ? "min-h-screen bg-foreground dark:bg-background flex items-center justify-center p-4"
        : "flex items-center justify-center p-4";

    const getIcon = () => {
        switch (typeError) {
            case '404':
                return 'SearchX';
            case '403':
                return 'ShieldAlert';
            case '401':
                return 'LockKeyhole';
            default:
                return 'CircleAlert';
        }
    };

    return (
        <div className={containerClass}>
            <div className="max-w-md w-full space-y-4">
                <Alert variant={variant} className="border-2">
                    <Icon name={getIcon()} size={20} />
                    <AlertTitle className="text-lg font-bold">
                        Error {typeError}
                    </AlertTitle>
                    <AlertDescription className="mt-2 space-y-4">
                        <p className="text-base">{message}</p>

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            {actionText && onAction && (
                                <Button
                                    onClick={onAction}
                                    variant="default"
                                    className="w-full sm:w-auto"
                                >
                                    {actionText}
                                </Button>
                            )}
                            {showHomeLink && (
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                    >
                                        <Icon name="Home" size={16} />
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
