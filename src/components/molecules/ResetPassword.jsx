import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./Form";
import Typography from "../atoms/Typography";
import useAuth from "../../hooks/useAuth";
import validatorInput from "../../utils/validatorsInputs";
import useCodeStore from "../../store/code.store";
import useLoginStore from "../../store/login.store";

export default function ResetPassword({ title, description }) {
    const { auth } = useAuth('resetPassword');
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let nam = name === 'confirmPassword' ? 'password' : name;
        let error = validatorInput(nam, value);
        setErrors(error);

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setErrors('Las contraseñas no coinciden')
        }

        const email = useCodeStore.getState().email;
        const res = await auth({ password: formData.password, email })
        if (res.error) {
            return setErrors(res.message)
        }

        useLoginStore.getState().setLoginData({email, password: formData.password});
        router.push('/users/login');
    };

    return (
        <>
            <header className="space-y-2 text-center">
                <Typography variant="h2">{title}</Typography>
                <Typography variant="subtitle">
                    {description}
                </Typography>
            </header>

            <Form
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                variant="resetPassword"
                buttonText="Cambiar contraseña"
            />

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