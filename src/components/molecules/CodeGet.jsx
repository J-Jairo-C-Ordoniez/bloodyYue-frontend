import { useState } from "react";
import Form from "./Form";
import Typography from "../atoms/Typography";
import useAuth from "../../hooks/useAuth";
import validatorInput from "../../utils/validatorsInputs";
import useCodeStore from "../../store/code.store";

export default function CodeGet({ title, description, type, setStep = null }) {
    const { loading, error, codeGet } = useAuth('none');
    const [errors, setErrors] = useState(error);
    const [formData, setFormData] = useState({ email: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let error = validatorInput(name, value);
        setErrors(error);

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await codeGet({ email: formData.email, type })
        useCodeStore.getState().setEmail(formData.email)
        setStep && setStep(2);
    };

    return (
        <>
            <header className="space-y-2 text-center">
                <Typography variant="h2" className="text-white">{title}</Typography>
                <Typography variant="body" className="text-zinc-400">
                    {description}
                </Typography>
            </header>
            <Form
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                variant="recovery"
                buttonText="Solicitar Código"
            />

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
