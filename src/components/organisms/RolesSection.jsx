import { useState, useEffect } from "react"
import useRoles from "../../hooks/useRoles"
import Typography from "../atoms/Typography"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { Label } from "../atoms/Label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../molecules/Table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../molecules/Dialog"
import { Checkbox } from "../atoms/Checkbox"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"
import { IconPlus, IconShieldCheck } from "@tabler/icons-react"

export function RolesSection() {
    const {
        roles,
        permits,
        loading: rolesLoading,
        createRole,
        assignPermit,
        removePermit,
        fetchAllPermits,
        fetchRoleDetails
    } = useRoles(null, 'rolesGet')

    const [selectedRole, setSelectedRole] = useState(null)
    const [newRole, setNewRole] = useState({ name: "", description: "" })
    const [rolePermits, setRolePermits] = useState([])
    const [isFetchingPermits, setIsFetchingPermits] = useState(false)

    useEffect(() => {
        fetchAllPermits()
    }, [fetchAllPermits])

    const handleCreateRole = async (e) => {
        e.preventDefault()
        const response = await createRole(newRole)
        if (!response.error) {
            toast.success("Rol creado exitosamente")
            setNewRole({ name: "", description: "" })
        } else {
            toast.error("Error al crear rol: " + response.message)
        }
    }

    const openPermitsDialog = async (role) => {
        setSelectedRole(role)
        setIsFetchingPermits(true)
        const response = await fetchRoleDetails(role.rolId)

        if (!response.error) {
            setRolePermits(response.data.permits || [])
        } else {
            setRolePermits([])
            toast.error("Error al cargar permisos del rol")
        }
        setIsFetchingPermits(false)
    }

    const handleTogglePermit = async (permitId, checked) => {
        let response;
        if (checked) {
            response = await assignPermit(selectedRole.rolId, permitId)
        } else {
            response = await removePermit(selectedRole.rolId, permitId)
        }

        if (!response.error) {
            toast.success(checked ? "Permiso asignado" : "Permiso removido")
            if (checked) {
                const permit = permits.find(p => p.permitId === permitId)
                setRolePermits(prev => [...prev, permit])
            } else {
                setRolePermits(prev => prev.filter(p => p.permitId !== permitId))
            }
        } else {
            toast.error("Error: " + response.message)
        }
    }

    if (rolesLoading && roles.length === 0) return <LoaderCard title="Cargando Roles y Permisos..." />

    return (
        <section className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de roles y permisos</Typography>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <IconPlus size={18} /> Nuevo rol
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crear nuevo rol</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateRole} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="roleName" color="#A1A1AA">Nombre del rol</Label>
                                <Input
                                    id="roleName"
                                    value={newRole.name}
                                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                    placeholder="Ej. Moderador"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="roleDesc" color="#A1A1AA">Descripción</Label>
                                <Input
                                    id="roleDesc"
                                    value={newRole.description}
                                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                    placeholder="Descripción del rol"
                                />
                            </div>
                            <Button type="submit" className="w-full">Crear rol</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Nombre del rol</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Permisos</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.rolId}>
                                <TableCell className="font-semibold">{role.name}</TableCell>
                                <TableCell className="text-muted-foreground">{role.description}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-xs text-primary">
                                        <IconShieldCheck size={14} />
                                        Gestionar permisos
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => openPermitsDialog(role)}>
                                                Configurar Permisos
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Permisos para: {selectedRole?.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                                {permits.map((permit) => (
                                                    <div key={permit.permitId} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50 transition-colors border border-border/50">
                                                        <Checkbox
                                                            id={`permit-${permit.permitId}`}
                                                            checked={rolePermits.some(p => p.permitId === permit.permitId)}
                                                            onCheckedChange={(checked) => handleTogglePermit(permit.permitId, checked)}
                                                        />
                                                        <div className="space-y-0.5">
                                                            <Label htmlFor={`permit-${permit.permitId}`} color="#A1A1AA" className="text-sm font-medium leading-none cursor-pointer">
                                                                {permit.name}
                                                            </Label>
                                                            <p className="text-[10px] text-muted-foreground">{permit.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
