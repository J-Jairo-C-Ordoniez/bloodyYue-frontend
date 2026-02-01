import { useMemo } from "react"
import useUsers from "../../hooks/useUsers"
import useRoles from "../../hooks/useRoles"
import Typography from "../atoms/Typography"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../molecules/Table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../molecules/Select"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"

export function UsersSection() {
    const { userData: users, loading: usersLoading, changeStatus, changeRole } = useUsers('usersGet')
    const { roles, loading: rolesLoading } = useRoles(null, 'rolesGet')

    const loading = usersLoading || rolesLoading

    const handleStatusChange = async (userId, newStatus) => {
        const response = await changeStatus(userId, newStatus)
        if (!response.error) {
            toast.success("Estado del usuario actualizado")
        } else {
            toast.error("Error al actualizar estado: " + response.message)
        }
    }

    const handleRoleChange = async (userId, newRolId) => {
        const response = await changeRole(userId, newRolId)
        if (!response.error) {
            toast.success("Rol del usuario actualizado")
        } else {
            toast.error("Error al actualizar rol: " + response.message)
        }
    }

    if (loading && !users) return <LoaderCard title="Cargando Usuarios..." />

    return (
        <section className="p-6">
            <Typography variant="subtitle" className="mb-6 text-foreground">Gestión de usuarios</Typography>
            <div className="rounded-md border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-background">
                        {users && users.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell className="font-mono text-xs">{user.userId}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.rolId}
                                        onValueChange={(val) => handleRoleChange(user.userId, val)}
                                    >
                                        <SelectTrigger className="w-[110px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles && roles.map((rol) => (
                                                <SelectItem key={rol.rolId} value={rol.rolId}>
                                                    {rol.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.status}
                                        onValueChange={(val) => handleStatusChange(user.userId, val)}
                                    >
                                        <SelectTrigger className="w-[110px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Activo</SelectItem>
                                            <SelectItem value="inactive">Inactivo</SelectItem>
                                            <SelectItem value="banned">Baneado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
