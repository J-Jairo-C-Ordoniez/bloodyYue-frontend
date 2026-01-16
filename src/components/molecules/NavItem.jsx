import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export default function NavItem({ icon, id, label, isActive = false, onTabChange }) {
    return (
        <Button
            variant="menuApp"
            isActive={isActive}
            onClick={() => onTabChange(id)}
        >
            <Icon name={icon} size={24} />
            {label}
        </Button>
    );
}
