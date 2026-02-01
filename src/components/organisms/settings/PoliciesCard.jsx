import { Card, CardContent, CardHeader, CardTitle } from "../../molecules/Card"
import { Textarea } from "../../atoms/Textarea"

export function PoliciesCard({ formData, onChange }) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-wide">POLÍTICAS</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    name="usagePolicies"
                    value={formData.usagePolicies}
                    onChange={onChange}
                    placeholder="Define tus políticas de uso..."
                    className="min-h-[120px] bg-background/50"
                />
            </CardContent>
        </Card>
    )
}
