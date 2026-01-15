"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import FormLoginPanel from '../organisms/FormLoginPanel';
import auth from "../../api/auth/index"

export default function Login({ data }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await auth.loginPost(formData);
        if (res.error) {
            setErrors(res.message);
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