"use client"

import { useState, useEffect } from "react"
import settings from "../../api/settings/index"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import LoaderCard from "@/components/molecules/LoaderCard"

export function SettingsSection() {
    const [settings, setSettings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await settings.getSettings(1) // Assuming ID 1 for global settings
            if (!response.error) {
                setSettings(response.data)
            } else {
                toast.error("Failed to load settings: " + response.message)
            }
            setLoading(false)
        }
        fetchSettings()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const response = await settings.settingsPut({ id: 1, data: settings })
        if (!response.error) {
            toast.success("Settings updated successfully")
        } else {
            toast.error("Failed to update settings: " + response.message)
        }
        setSaving(false)
    }

    if (loading) return <LoaderCard title="Loading Settings..." />

    if (!settings) return <div className="p-4 text-white">No settings found.</div>

    return (
        <div className="p-4 bg-background rounded-lg shadow-md max-w-4xl mx-auto my-6 border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Global Site Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Site Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={settings.title || ""}
                            onChange={handleChange}
                            placeholder="Main Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Site Subtitle</Label>
                        <Input
                            id="subtitle"
                            name="subtitle"
                            value={settings.subtitle || ""}
                            onChange={handleChange}
                            placeholder="Subtitle / Tagline"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contentHero">Hero Content</Label>
                    <Input
                        id="contentHero"
                        name="contentHero"
                        value={settings.contentHero || ""}
                        onChange={handleChange}
                        placeholder="Hero Section Text"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={settings.email || ""}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="abaut">About Section</Label>
                    <Textarea
                        id="abaut"
                        name="abaut"
                        value={settings.abaut || ""}
                        onChange={handleChange}
                        placeholder="Describe the site..."
                        rows={5}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="work">Work Section Description</Label>
                    <Textarea
                        id="work"
                        name="work"
                        value={settings.work || ""}
                        onChange={handleChange}
                        placeholder="Description of work/services..."
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="usagePolicies">Usage Policies</Label>
                    <Input
                        id="usagePolicies"
                        name="usagePolicies"
                        value={settings.usagePolicies || ""}
                        onChange={handleChange}
                        placeholder="Policy description or link"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={saving}>
                        {saving ? "Saving Changes..." : "Save Settings"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
