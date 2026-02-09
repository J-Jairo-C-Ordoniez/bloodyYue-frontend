'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Algo salió mal</h2>
            <p className="text-gray-400 mb-6">Hemos experimentado un error inesperado. Por favor, intenta de nuevo.</p>
            <button
                onClick={() => reset()}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
                Reintentar
            </button>
        </div>
    );
}
