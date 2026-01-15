import { useState } from "react";
import OtpInput from "../atoms/OtpInput";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";
import useAuth from "../../hooks/useAuth";
import validatorInput from "../../utils/validatorsInputs";
import useCodeStore from "../../store/code.store";

export default function CodeVerify({ title, setStep = null }) {
    const { auth } = useAuth('codeVerify');
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({ otp: '' });

    const handleOtpChange = (value) => {
        let error = validatorInput('otp', value);
        setErrors(error);
        setFormData(prev => ({ ...prev, otp: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = useCodeStore.getState().email;
        const res = await auth({ code: formData.otp, email })
        if (res.error) {
            return setErrors(res.message)
        }

        setStep(3);
    };

    return (
        <>
            <header className="space-y-2 text-center">
                <Typography variant="small" className="text-purple-400">{title}</Typography>
                <Typography variant="h2">Verificación de Identidad</Typography>
                <Typography variant="subtitle">
                    Ingresa el código de 6 dígitos enviado a tu correo electrónico.
                </Typography>
            </header>
            <div className="space-y-8">
                <OtpInput value={formData.otp} onChange={handleOtpChange} />
                <Button variant="submit" size="large" onClick={handleSubmit}>
                    Verificar Codigo
                </Button>
            </div>

            {errors && (
                <article className="space-y-1">
                    <Typography variant="error">
                        {errors}
                    </Typography>
                </article>
            )}
        </>
    );
}