import { useState } from 'react';
import Link from "../atoms/Link";
import CodeGet from '../molecules/CodeGet';
import CodeVerify from '../molecules/CodeVerify';
import ResetPassword from '../molecules/ResetPassword';

export default function ResetPasswordForm() {
    const [step, setStep] = useState(1);

    return (
        <section className="w-full flex items-center justify-center p-6 sm:p-12 lg:p-24 min-h-screen bg-black">
            <div className="container w-full max-w-md space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">

                {step === 1 && <CodeGet
                    title="¿Olvidaste tu contraseña?"
                    description="Ingresa tu correo electrónico registrado para recibir un código de recuperación y regresar el acceso a tu cuenta."
                    setStep={setStep}
                />}

                {step === 2 && <CodeVerify
                    title="Verificación del código"
                    setStep={setStep}
                />}

                {step === 3 && <ResetPassword
                    title="Crea tu nueva contraseña"
                    description="Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta."
                />}

                <div className="text-center pt-4">
                    <Link
                        href="/users/login"
                        variant="link"
                        size="default"
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                    >
                        Volver al Login
                    </Link>
                </div>

                <div className="flex justify-center gap-2 pt-4">
                    <div className={`h-1 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-purple-600' : 'w-2 bg-gray-700'}`} />
                    <div className={`h-1 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-purple-600' : 'w-2 bg-gray-700'}`} />
                    <div className={`h-1 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-purple-600' : 'w-2 bg-gray-700'}`} />
                </div>
            </div>
        </section>
    );
}
