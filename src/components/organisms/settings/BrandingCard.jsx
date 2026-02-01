import { Card, CardContent, CardHeader, CardTitle } from "../../molecules/Card"
import { Label } from "../../atoms/Label"
import Input from "../../atoms/Input"

export function BrandingCard({ formData, onChange }) {
    return (
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
                            onChange={onChange}
                            placeholder="Título del sitio"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtítulo</Label>
                        <Input
                            id="subtitle"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={onChange}
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
                            onChange={onChange}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
