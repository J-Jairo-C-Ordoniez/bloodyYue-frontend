import { IconPencil, IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/atoms/Button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/molecules/Dialog"

export default function CommissionList({ commissions, onEdit }) {
    if (!commissions || commissions.length === 0) {
        return <div className="text-center p-8 text-muted-foreground">No commissions found.</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commissions.map((comm) => (
                <div key={comm.commissionId} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-video relative bg-muted overflow-hidden">
                        {comm.content ? (
                            <img src={comm.content} alt={comm.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                                <IconPencil size={48} className="opacity-20" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                            {comm.labels?.map(l => (
                                <span key={l.labelId} className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm border border-white/10" style={{ color: l.color }}>
                                    {l.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg leading-tight line-clamp-1">{comm.title}</h3>
                            <span className="font-mono font-bold text-primary">${comm.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{comm.description}</p>

                        <div className="pt-3 border-t border-border flex justify-end">
                            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary" onClick={() => onEdit(comm)}>
                                <IconPencil size={16} className="mr-2" /> Editar
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
