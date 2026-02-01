import { useState, useEffect } from "react"
import useSettings from "../../hooks/useSettings"
import validatorInput from "../../utils/validatorsInputs"
import Typography from "../atoms/Typography"
import Button from "../atoms/Button"
import LoaderCard from "../molecules/LoaderCard"
import { BrandingCard } from "./settings/BrandingCard"
import { PlatformImageCard } from "./settings/PlatformImageCard"
import { AboutWorkCard } from "./settings/AboutWorkCard"
import { PoliciesCard } from "./settings/PoliciesCard"
import { toast } from "sonner"

export default function SettingsSection() {
    const { settings, isLoadingSetting, errorSetting, updateSettings, uploadHero } = useSettings(1)
    const [errors, setErrors] = useState({})
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
            toast.error("Error al actualizar los ajustes")
        } else {
            toast.success("Ajustes actualizados correctamente")
        }

        setSaving(false)
    }

    const handleFileChange = async (e, context) => {
        const file = e.target.files?.[0]
        if (!file) return

        const res = await uploadHero({ file: file, context: context })

        if (!res.error) {
            setFormData(prev => ({ ...prev, [context]: res.data }))
            toast.success("Imagen actualizada")
        } else {
            toast.error(res.message || "Error al subir imagen")
        }
    }

    if (isLoadingSetting && !settings) return <LoaderCard title="Cargando ajustes..." />

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-5xl mx-auto space-y-6 pb-20">
            {errorSetting && <Typography variant="error">Error cargando ajustes</Typography>}

            <BrandingCard formData={formData} onChange={handleChange} />

            <PlatformImageCard heroImage={formData.contentHero} onFileChange={handleFileChange} />

            <AboutWorkCard formData={formData} onChange={handleChange} />

            <PoliciesCard formData={formData} onChange={handleChange} />

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    variant="submit"
                    size="large"
                    disabled={saving}
                    className="w-full md:w-auto min-w-[200px]"
                >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </form>
    )
}

