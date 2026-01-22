"use client"

import { useState, useEffect } from "react"
import settingsApi from "../../api/settings/index"
import useSettings from "../../hooks/useSettings"
import validatorInput from "../../utils/validatorsInputs"
import Typography from "../atoms/Typography"
import Input from "../atoms/Input"
import Button from "../atoms/Button"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import LoaderCard from "../molecules/LoaderCard"

export default function SettingsSection() {
    const { setting, isLoadingSetting, errorSetting } = useSettings(1)
    const [formData, setFormData] = useState({
        title: setting?.data?.title || "",
        subtitle: setting?.data?.subtitle || "",
        contentHero: setting?.data?.contentHero || "",
        email: setting?.data?.email || "",
        abaut: setting?.data?.abaut || "",
        work: setting?.data?.work || "",
        usagePolicies: setting?.data?.usagePolicies || ""
    })
    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (!setting || errorSetting || isLoadingSetting) return
        setFormData({
            title: setting?.data?.title || "",
            subtitle: setting?.data?.subtitle || "",
            contentHero: setting?.data?.contentHero || "",
            email: setting?.data?.email || "",
            abaut: setting?.data?.abaut || "",
            work: setting?.data?.work || "",
            usagePolicies: setting?.data?.usagePolicies || ""
        })
    }, [setting])

    const handleChange = (e) => {
        const { name, value } = e.target
        let nam = name === 'title' ? 'text'
            : name === 'subtitle' ? 'text'
                : name === 'contentHero' ? 'link'
                    : name === 'email' ? 'email'
                        : name === 'abaut' ? 'text'
                            : name === 'work' ? 'text'
                                : name === 'usagePolicies' ? 'text'
                                    : name
        let error = validatorInput(nam, value)
        setErrors(error)

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const res = await settingsApi.settingsPut({ id: setting?.data?.settingId, data: formData })
        if (!res.error) {
            setErrors('Error al actualizar los ajustes')
        }

        setSaving(false)
    }

    const inputs = [
        {
            id: 'title',
            name: 'title',
            label: 'Titulo',
            type: 'text',
            placeholder: 'Titulo',
            value: formData.title,
            onChange: handleChange,
        },
        {
            id: 'email',
            name: 'email',
            label: 'Correo',
            type: 'email',
            placeholder: 'Correo',
            value: formData.email,
            onChange: handleChange
        },
        {
            id: 'subtitle',
            name: 'subtitle',
            label: 'Subtitulo',
            type: 'text',
            placeholder: 'Subtitulo',
            value: formData.subtitle,
            onChange: handleChange,
            colSpan: 'col-span-2'
        },
        {
            id: 'contentHero',
            name: 'contentHero',
            label: 'Contenido Hero',
            type: 'text',
            placeholder: 'Contenido Hero',
            value: formData.contentHero,
            onChange: handleChange,
            colSpan: 'col-span-2'
        },
        
        {
            id: 'abaut',
            name: 'abaut',
            label: 'Habla sobre tí',
            type: 'text',
            placeholder: 'Habla sobre tí',
            value: formData.abaut,
            onChange: handleChange,
            colSpan: 'col-span-2'
        },
        {
            id: 'work',
            name: 'work',
            label: 'Trabajo',
            type: 'text',
            placeholder: 'Trabajo',
            value: formData.work,
            onChange: handleChange,
            colSpan: 'col-span-2'
        },
        {
            id: 'usagePolicies',
            name: 'usagePolicies',
            label: 'Política de uso',
            type: 'text',
            placeholder: 'Política de uso',
            value: formData.usagePolicies,
            onChange: handleChange,
            colSpan: 'col-span-2'
        }
    ]

    return (
        <section className="p-4 w-[50%] mx-auto my-6">
            {isLoadingSetting && <LoaderCard title="Loading Settings..." />}
            {errorSetting && <h2 className="text-2xl font-bold mb-6 text-foreground">Global error Settings</h2>}
            {setting && !isLoadingSetting && !errorSetting && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {inputs.map((input) => (
                            <div key={input.id} className={input?.colSpan}>
                                <Input
                                    id={input.id}
                                    name={input.name}
                                    label={input.label}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    onChange={input.onChange}
                                />
                            </div>
                        ))}
                    </div>


                    <Button
                        type="submit"
                        variant="submit"
                        size="large"
                    >
                        Guardar
                    </Button>
                </form>
            )}

            {errors && (
                <article className="space-y-1">
                    <Typography variant="error">
                        {errors}
                    </Typography>
                </article>
            )}
        </section>
    )
}
