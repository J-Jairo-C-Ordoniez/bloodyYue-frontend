import NavItem from '../molecules/NavItem';
import Typography from '../atoms/Typography';
import useLabels from '../../hooks/useLabels';
import Label from '../atoms/Label';

export default function ProfileSidebarLeft({ activeTab, onTabChange }) {
    const { label, isLoadingLabel, errorLabel } = useLabels();

    const navItems = [
        { id: 'home', icon: 'Home', label: 'Inicio' },
        { id: 'forYou', icon: 'Sparkles', label: 'Para ti' },
        { id: 'commissions', icon: 'Image', label: 'Comisones' },
        { id: 'explore', icon: 'Crown', label: 'Explorar' },
        { id: 'notifications', icon: 'Bell', label: 'Notificaciones' },
    ];

    return (
        <aside className="w-64 shrink-0 sticky top-24 self-start space-y-8 hidden lg:block">
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavItem key={item.id} isActive={activeTab === item.id} onTabChange={onTabChange} {...item} />
                ))}
            </nav>

            <div>
                <Typography variant="small" className="px-4 mb-4 uppercase tracking-wider">
                    Tendencias
                </Typography>

                {isLoadingLabel && (
                    <div className="space-y-2 px-2">
                        <LoaderCard variant="text" lines={1} />
                        <LoaderCard variant="text" lines={1} />
                        <LoaderCard variant="text" lines={1} />
                    </div>
                )}
                {(errorLabel || label?.error) && (
                    <div className="px-2">
                        <ErrorCard message={errorLabel || 'Error al cargar las etiquetas'} />
                    </div>
                )}

                <div className="flex flex-wrap gap-2 px-2">
                    {label?.data && label.data.map((tag) => (
                        <Label key={tag.labelId} color={tag.color} variant="trending">
                            {tag.name}
                        </Label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
