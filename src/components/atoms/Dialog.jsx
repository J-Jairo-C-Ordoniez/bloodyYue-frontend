import { useEffect, useRef } from 'react';
import Icon from './Icon';
import Typography from './Typography';
import Button from './Button';

export default function Dialog({ isOpen, onClose, title, children, className = '' }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={`backdrop:bg-black/50 overflow-hidden bg-[#121212] m-5 backdrop:backdrop-blur-sm rounded-2xl p-0 flex justify-center max-w-2xl shadow-2xl ${className}`}
            onClose={handleClose}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
                if (e.target === dialogRef.current) handleClose();
            }}
        >
            <div className="relative flex flex-col h-fit">
                <header className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <Typography variant="subtitle" className="font-bold pr-8">
                        {title}
                    </Typography>
                    <Button
                        variant="ghost"
                        size="small"
                        onClick={handleClose}
                        className="absolute right-4 top-4"
                    >
                        <Icon name="X" size={20} />
                    </Button>
                </header>

                <div className="overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </dialog>
    );
}
