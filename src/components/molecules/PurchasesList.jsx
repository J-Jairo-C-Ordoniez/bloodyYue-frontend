'use client';

import { useEffect } from 'react';
import useSales from '../../hooks/useSales';
import LoaderCard from './LoaderCard';
import ErrorCard from './ErrorCard';
import Icon from '../atoms/Icon';

export default function PurchasesList() {
    const { salesData, getMySales, isLoadingSales, errorSales } = useSales();

    useEffect(() => {
        getMySales();
    }, []);

    if (isLoadingSales) {
        return (
            <div className="grid gap-4">
                <LoaderCard variant="text" />
                <LoaderCard variant="text" />
                <LoaderCard variant="text" />
            </div>
        );
    }

    if (errorSales) {
        return <ErrorCard message={errorSales} />;
    }

    if (!salesData || salesData.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                <Icon name="ShoppingBag" size={40} className="mx-auto text-zinc-600 mb-3" />
                <p className="text-zinc-400 font-medium">No has realizado ninguna compra aún.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {salesData.map((sale) => (
                <div key={sale.saleId} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sale.status === 'paid' ? 'bg-green-500/10 text-green-500'
                            : sale.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            <Icon name={sale.status === 'paid' ? 'Check' : 'Clock'} size={20} />
                        </div>
                        <div>
                            <p className="text-zinc-200 font-medium">Orden #{sale.saleId}</p>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <span>{new Date(sale.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span className="capitalize">{sale.paymentMethod}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-white font-bold text-lg">${sale.total}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${sale.status === 'paid' ? 'bg-green-500/10 text-green-500'
                            : sale.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {sale.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
