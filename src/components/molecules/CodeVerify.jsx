import { useState } from "react";
import OtpInput from "../atoms/OtpInput";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";
import useAuth from "../../hooks/useAuth";
import validatorInput from "../../utils/validatorsInputs";
import useCodeStore from "../../store/code.store";

export default function CodeVerify({ title, setStep = null, onSuccess = null }) {
    const { loading, error, codeVerify } = useAuth('none');
    const [errors, setErrors] = useState(error);
    const [formData, setFormData] = useState({ otp: '' });

    const handleOtpChange = (value) => {
        let error = validatorInput('otp', value);
        setErrors(error);
        setFormData(prev => ({ ...prev, otp: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = useCodeStore.getState().email;
        const res = await codeVerify({ code: formData.otp, email })
        if (res.error) {
            return setErrors(res.message)
        }

        if (onSuccess) {
            await onSuccess();
        }

        if (setStep) {
            setStep(3);
        }
    };

    return (
        <>
            <header className="space-y-2 text-center">
                <Typography variant="small" className="text-zinc-400">{title}</Typography>
                <Typography variant="h2" className="text-white">Verificación de Identidad</Typography>
                <Typography variant="subtitle" className="text-zinc-400">
                    Ingresa el código de 6 dígitos enviado a tu correo electrónico.
                </Typography>
            </header>
            <div className="space-y-8 flex flex-col items-center">
                <OtpInput value={formData.otp} onChange={handleOtpChange} />
                <Button className="p-3" variant="submit" size="large" onClick={handleSubmit}>
                    {loading ? 'Verificando...' : 'Verificar Codigo'}
                </Button>
            </div>

            {errors && (
                <article className="space-y-1">
                    <Typography variant="error">
                        {errors || error}
                    </Typography>
                </article>
            )}
        </>
    );
}
