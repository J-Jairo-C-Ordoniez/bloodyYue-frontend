"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import FormLoginPanel from '../organisms/FormLoginPanel';
import validatorInput from '../../utils/validatorsInputs';
import useAuth from '../../hooks/useAuth'

export default function Login({ data }) {
    const router = useRouter();
    const {auth} = useAuth('login');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = validatorInput(name, value);

        setErrors(error);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await auth(formData);
        if (res.error) {
            return setErrors(res.message);
        }

        router.replace('/profile/dashboard');
    };

    return (
        <main className="flex h-screen w-full bg-foreground dark:bg-background">
            <FeaturedWorkSidePanel post={data} />
            <FormLoginPanel
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        </main>
    );
}