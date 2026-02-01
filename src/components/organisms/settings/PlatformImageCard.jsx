import { Card, CardContent, CardHeader, CardTitle } from "../../molecules/Card"
import Image from '../../atoms/Image'
import Icon from '../../atoms/Icon'

export function PlatformImageCard({ heroImage, onFileChange }) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-wide">IMAGEN DE LA PLATAFORMA</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full aspect-video md:aspect-auto bg-muted/30 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25 group transition-all hover:border-primary/50">
                    {heroImage ? (
                        <Image
                            src={heroImage}
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
                            onChange={(e) => onFileChange(e, 'contentHero')}
                        />
                    </label>
                </div>
            </CardContent>
        </Card>
    )
}
