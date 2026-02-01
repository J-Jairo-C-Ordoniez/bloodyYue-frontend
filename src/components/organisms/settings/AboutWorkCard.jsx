import { Card, CardContent, CardHeader, CardTitle } from "../../molecules/Card"
import { Textarea } from "../../atoms/Textarea"

export function AboutWorkCard({ formData, onChange }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold tracking-wide">SOBRE MÍ</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        name="abaut"
                        value={formData.abaut}
                        onChange={onChange}
                        placeholder="Dinos algo sobre ti..."
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
                        onChange={onChange}
                        placeholder="Describe el alcance de tu trabajo..."
                        className="min-h-[150px] resize-none bg-background/50"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
