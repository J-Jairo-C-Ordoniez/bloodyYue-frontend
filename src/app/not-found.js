import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <h2 className="text-4xl font-bold text-gray-200 mb-2">404</h2>
            <p className="text-xl text-gray-400 mb-6">Página no encontrada</p>
            <Link
                href="/"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors uppercase tracking-wider text-sm font-semibold"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
