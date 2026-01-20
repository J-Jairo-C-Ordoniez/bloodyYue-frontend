import Dialog from '../atoms/Dialog';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Link from '../atoms/Link';

export default function AuthRequiredDialog({ isOpen, onClose }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Acceso Requerido"
            className="bg-[#121212] m-auto! max-w-sm"
        >
            <div className="flex flex-col p-2 text-center">
                <Typography variant="body" className="text-zinc-300">
                    Para realizar esta acción necesitas una cuenta.
                </Typography>
                <Typography variant='subtitle' className='text-zinc-200 mb-6'>
                    ¡Únete a nuestra comunidad!
                </Typography>

                <div className="flex flex-col justify-center items-center gap-3 w-full mb-6">
                    <Link href="/users/login" variant="secondary">Acceder</Link>
                    <Link href="/users/register" variant="primary">Registrarse</Link>
                </div>

                <Button
                    variant="ghost"
                    size="small"
                    onClick={onClose}
                    className="mx-auto text-zinc-500 hover:text-zinc-300"
                >
                    Cancelar
                </Button>
            </div>
        </Dialog>
    );
}
