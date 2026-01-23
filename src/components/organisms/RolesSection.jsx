"use client"

import { useState, useEffect } from "react"
import rolesApi from "@/api/roles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"
import { IconPlus, IconShieldCheck } from "@tabler/icons-react"

export function RolesSection() {
    const [roles, setRoles] = useState([])
    const [permits, setPermits] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRole, setSelectedRole] = useState(null)
    const [newRole, setNewRole] = useState({ name: "", description: "" })
    const [rolePermits, setRolePermits] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const [rolesRes, permitsRes] = await Promise.all([
            rolesApi.rolesGet(),
            rolesApi.rolesGetAllPermitsGet()
        ])
        if (!rolesRes.error) setRoles(rolesRes.data)
        if (!permitsRes.error) setPermits(permitsRes.data)
        setLoading(false)
    }

    const handleCreateRole = async (e) => {
        e.preventDefault()
        const response = await rolesApi.rolesPost({ data: newRole })
        if (!response.error) {
            toast.success("Role created successfully")
            setNewRole({ name: "", description: "" })
            fetchData()
        } else {
            toast.error("Failed to create role: " + response.message)
        }
    }

    const openPermitsDialog = async (role) => {
        setSelectedRole(role)
        const response = await rolesApi.rolesGetId({ rolId: role.rolId })
        if (!response.error) {
            setRolePermits(response.data.permits || [])
        }
    }

    const togglePermit = async (permitId, checked) => {
        const data = { rolId: selectedRole.rolId, permitId }
        let response;
        if (checked) {
            response = await rolesApi.rolesAssignPermitPost({ data })
        } else {
            response = await rolesApi.rolesRemovePermitDelete({ data })
        }

        if (!response.error) {
            toast.success(checked ? "Permission assigned" : "Permission removed")
            // Update local state for permissions
            if (checked) {
                const permit = permits.find(p => p.permitId === permitId)
                setRolePermits(prev => [...prev, permit])
            } else {
                setRolePermits(prev => prev.filter(p => p.permitId !== permitId))
            }
        } else {
            toast.error("Action failed: " + response.message)
        }
    }

    if (loading) return <LoaderCard title="Loading Roles & Permissions..." />

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Roles & Permissions</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <IconPlus size={18} /> New Role
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Role</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateRole} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="roleName">Role Name</Label>
                                <Input
                                    id="roleName"
                                    value={newRole.name}
                                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                    placeholder="e.g., Moderator"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="roleDesc">Description</Label>
                                <Input
                                    id="roleDesc"
                                    value={newRole.description}
                                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                    placeholder="Brief description of the role"
                                />
                            </div>
                            <Button type="submit" className="w-full">Create Role</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Role Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                        Manage permits
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => openPermitsDialog(role)}>
                                                Configure Permits
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Permissions for: {selectedRole?.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                                {permits.map((permit) => (
                                                    <div key={permit.permitId} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50 transition-colors border border-border/50">
                                                        <Checkbox
                                                            id={`permit-${permit.permitId}`}
                                                            checked={rolePermits.some(p => p.permitId === permit.permitId)}
                                                            onCheckedChange={(checked) => togglePermit(permit.permitId, checked)}
                                                        />
                                                        <div className="space-y-0.5">
                                                            <Label htmlFor={`permit-${permit.permitId}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
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
        </div>
    )
}
