"use client";

import { useState } from 'react';
import useAuthStore from "../../store/auth.store";
import { useRouter } from 'next/navigation';
import FeaturedWorkSidePanel from '../organisms/FeaturedWorkSidePanel';
import FormLoginPanel from '../organisms/FormLoginPanel';
import validatorInput from '../../utils/validatorsInputs';
import useAuth from '../../hooks/useAuth'
import useLoginStore from '../../store/login.store';

export default function Login({ data }) {
    const router = useRouter();
    const {auth} = useAuth('login');
    const userAuth = useLoginStore.getState().userAuth;
    const [formData, setFormData] = useState({
        email: userAuth?.email || '',
        password: userAuth?.password || ''
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
        if (res?.error) {
            return setErrors(res.message);
        }

        useAuthStore.getState().setAuth(res.data.accessToken, res.data.user);
        useLoginStore.getState().setLoginData(formData.email, formData.password);

        router.replace('/profile');
    };

    return (
        <main className="flex h-screen w-full bg-[#0B0B0E]">
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