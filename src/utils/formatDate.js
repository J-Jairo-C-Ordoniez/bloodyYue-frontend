export default function formatDate(dateString) {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}