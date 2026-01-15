'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CodeVerify from "../molecules/CodeVerify";
import Typography from "../atoms/Typography";
import useCodeStore from "../../store/code.store";
import useAuth from "../../hooks/useAuth";

export default function VerifyAccountPanel() {
    const router = useRouter();
    const [errors, setErrors] = useState(null);
    const { auth } = useAuth('codeGet');

    useEffect(() => {
        (async () => {
            const email = useCodeStore.getState().email;
            if (!email) return setErrors('No se proporciono un correo')
            const res = await auth({ email, type: 'verify' })
            if (res.error) {
                return setErrors(res.message)
            }
        })()
    }, []);

    const handleVerifySuccess = async () => {
        router.push('/users/login');
    };

    return (
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
            <div className="container w-full h-full max-w-md space-y-8">
                <CodeVerify
                    title="Verificación"
                    onSuccess={handleVerifySuccess}
                />

                <article className="space-y-1 text-center">
                    <Typography variant="small" className="text-gray-500">
                        ¿No recibiste el código? <span className="text-white cursor-pointer hover:underline">Reenviar</span>
                    </Typography>
                </article>

                {errors && (
                    <article className="space-y-1">
                        <Typography variant="error">
                            {errors}
                        </Typography>
                    </article>
                )}
            </div>
        </section>
    );
}
