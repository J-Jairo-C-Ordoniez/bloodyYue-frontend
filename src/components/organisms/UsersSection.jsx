"use client"

import { useState, useEffect } from "react"
import usersApi from "../../api/users/index"
import authApi from "../../api/auth/index"
import rolesApi from "../../api/roles/index"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Badge } from "../ui/badge"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"

export function UsersSection() {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
        fetchRoles()
    }, [])

    const fetchUsers = async () => {
        const response = await usersApi.usersGet()
        if (!response.error) {
            setUsers(response.data)
        } else {
            toast.error("Failed to load users: " + response.message)
        }
        setLoading(false)
    }

    const fetchRoles = async () => {
        const response = await rolesApi.rolesGet()
        if (!response.error) {
            setRoles(response.data)
        } else {
            toast.error("Failed to update role: " + response.message)
        }
    }

    const handleStatusChange = async (userId, newStatus) => {
        const response = await authApi.changeStatusPatch({ userId, status: newStatus })
        if (!response.error) {
            toast.success("User status updated")
            setUsers(prev => prev.map(u => u.userId === userId ? { ...u, status: newStatus } : u))
        } else {
            toast.error("Failed to update status: " + response.message)
        }
    }

    const handleRoleChange = async (userId, newRolId) => {
        const response = await authApi.changeRolePost({ userId, rolId: newRolId })
        if (!response.error) {
            setUsers(prev => prev.map(u => u.userId === userId ? { ...u, rolId: newRolId } : u))
        } else {
            toast.error("Failed to update role: " + response.message)
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Active</Badge>
            case 'inactive':
                return <Badge variant="secondary">Inactive</Badge>
            case 'banned':
                return <Badge variant="destructive">Banned</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    if (loading) return <LoaderCard title="Loading Users..." />

    return (
        <div className="p-4 bg-background rounded-lg shadow-md border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">User Management</h2>
            <div className="rounded-md border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
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

                                <TableCell>{getStatusBadge(user.status)}</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.status}
                                        onValueChange={(val) => handleStatusChange(user.userId, val)}
                                    >
                                        <SelectTrigger className="w-[110px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="banned">Banned</SelectItem>
                                            <SelectItem value="admin">ad</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
