import { useState, useEffect } from "react"
import useSettings from "../../hooks/useSettings"
import validatorInput from "../../utils/validatorsInputs"
import Typography from "../atoms/Typography"
import Input from "../atoms/Input"
import Button from "../atoms/Button"
import { Label } from "@/components/atoms/Label"
import { Textarea } from "@/components/atoms/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card"
import LoaderCard from "../molecules/LoaderCard"
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'

export default function SettingsSection() {
    const { settings, isLoadingSetting, errorSetting, updateSettings, uploadHero } = useSettings(1)
    const [errors, setErrors] = useState(null)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        contentHero: "",
        email: "",
        abaut: "",
        work: "",
        usagePolicies: ""
    })

    useEffect(() => {
        if (!settings) return
        setFormData({
            title: settings.title || "",
            subtitle: settings.subtitle || "",
            contentHero: settings.contentHero || "",
            email: settings.email || "",
            abaut: settings.abaut || "",
            work: settings.work || "",
            usagePolicies: settings.usagePolicies || ""
        })
    }, [settings])

    const handleChange = (e) => {
        const { name, value } = e.target

        let validationType = 'text'
        if (name === 'email') validationType = 'email'

        const error = validatorInput(validationType, value)
        setErrors(prev => ({ ...prev, [name]: error }))

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        const res = await updateSettings(settings?.settingId || 1, formData)

        if (res.error) {
            setErrors('Error al actualizar los ajustes')
        } else {
            setErrors('Ajustes actualizados correctamente')
        }

        setSaving(false)
    }

    const handleFileChange = async (e, context) => {
        const file = e.target.files?.[0]
        if (!file) return

        const res = await uploadHero({ file: file, context: context })

        if (!res.error) {
            setFormData(prev => ({ ...prev, [context]: res.data }))
        } else {
            setErrors(res.message || "Error al subir imagen")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-5xl mx-auto space-y-6">
            {isLoadingSetting && <LoaderCard title="Guardando ajustes..." />}
            {errorSetting && <span className="p-4 text-red-500">Error cargando ajustes</span>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold tracking-wide">BRANDING</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Título del sitio"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtítulo</Label>
                            <Input
                                id="subtitle"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="Subtítulo breve"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold tracking-wide">CONTACTO</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold tracking-wide">IMAGEN DE LA PLATAFORMA</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full aspect-video md:aspect-auto bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group transition-all hover:border-primary/50">
                        {formData.contentHero ? (
                            <Image
                                src={formData.contentHero}
                                alt="Hero Preview"
                                width={1200}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                                <Icon name="Image" size={48} className="mb-2 opacity-50" />
                                <span className="text-sm">Ninguna imagen seleccionada</span>
                            </div>
                        )}

                        <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                            <Icon name="Upload" size={32} className="mb-2" />
                            <span className="font-medium">Change Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, 'contentHero')}
                            />
                        </label>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold tracking-wide">SOBRE MÍ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            name="abaut"
                            value={formData.abaut}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            className="min-h-[150px] resize-none bg-background/50"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold tracking-wide">MI TRABAJO</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            name="work"
                            value={formData.work}
                            onChange={handleChange}
                            placeholder="Describe your work scope..."
                            className="min-h-[150px] resize-none bg-background/50"
                        />
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold tracking-wide">POLÍTICAS</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        name="usagePolicies"
                        value={formData.usagePolicies}
                        onChange={handleChange}
                        placeholder="Define your usage policies..."
                        className="min-h-[120px] bg-background/50"
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    variant="submit"
                    size="large"
                    disabled={saving}
                    className="w-full md:w-auto min-w-[200px] py-2"
                >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>

            {/* {errors && (
                <article className="space-y-1">
                    <Typography variant="error">
                        {errors}
                    </Typography>
                </article>
            )} */}
        </form>
    )
}

