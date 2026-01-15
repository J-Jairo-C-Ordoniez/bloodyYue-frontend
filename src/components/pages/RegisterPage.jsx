"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import FormRegisterPanel from '../organisms/FormRegisterPanel';
import validatorInput from '../../utils/validatorsInputs';
import useAuth from '../../hooks/useAuth'

export default function RegisterPage({ data }) {
    const router = useRouter();
    const { auth } = useAuth('register');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val = type === 'checkbox' ? checked : value;
        let nam = name === 'confirmPassword' ? 'password' : name;
        
        let error = validatorInput(nam, val);
        setErrors(error);

        setFormData(prev => ({
            ...prev,
            [name]: val
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrors("Las contraseñas no coinciden");
            return;
        }

        if (!formData.terms) {
            setErrors("Debes aceptar los términos y políticas de privacidad");
            return;
        }

        const res = await auth(formData);
        if (res?.error) {
            return setErrors(res.message);
        }

        router.replace('/users/login');
    };

    return (
        <main className="flex h-screen w-full bg-foreground dark:bg-background">
            <FeaturedWorkSidePanel post={data} />
            <FormRegisterPanel
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        </main>
    );
}
