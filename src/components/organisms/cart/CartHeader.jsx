import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';

export default function CartHeader({ itemCount }) {
    return (
        <header className="mb-8 flex items-center justify-between">
            <Typography variant="subtitle" className="text-zinc-100 font-bold flex items-center gap-2">
                <Icon name="ShoppingCart" size={24} className="text-zinc-300" />
                Tu Carrito
            </Typography>
            <Typography variant="body" className="text-zinc-300">
                {itemCount} items
            </Typography>
        </header>
    );
}
