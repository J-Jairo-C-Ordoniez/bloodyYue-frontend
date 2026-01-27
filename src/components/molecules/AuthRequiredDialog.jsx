import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './Dialog';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Link from '../atoms/Link';

export default function AuthRequiredDialog({ isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#121212] border-zinc-800 max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center text-white">Acceso Requerido</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col p-2 text-center">
                    <Typography variant="body" className="text-zinc-400">
                        Para realizar esta acción necesitas una cuenta.
                    </Typography>
                    <Typography variant='subtitle' className='text-zinc-200 mb-6'>
                        ¡Únete a nuestra comunidad!
                    </Typography>

                    <div className="flex flex-col justify-center items-center gap-3 w-full mb-6">
                        <Link href="/users/login" variant="secondary" className="w-full">Acceder</Link>
                        <Link href="/users/register" variant="primary" className="w-full">Registrarse</Link>
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
            </DialogContent>
        </Dialog>
    );
}
