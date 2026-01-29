import Form from "../molecules/Form";
import Link from "../atoms/Link";
import Typography from "../atoms/Typography";
import SocialButton from "../atoms/SocialButton";

export default function FormLoginPanel({ formData, handleChange, handleSubmit, errors }) {
    return (
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
            <div className="container w-full h-full max-w-md space-y-8">
                <article className="space-y-2">
                    <Typography variant="h2" className="text-white">
                        Bienvenido de vuelta
                    </Typography>
                    <Typography variant="subtitle" className="text-zinc-400">
                        Accede a tu galería exclusiva de BloodyYue y descargas.
                    </Typography>
                </article>

                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    variant="login"
                />

                <article className="space-y-1">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/users/forgot-password"
                            variant="link"
                            size="small"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </article>

                <article className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                        <span className="bg-[#0B0B0E] px-4 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </article>

                <article className="grid grid-cols-2 gap-4">
                    <SocialButton
                        provider="discord"
                    />
                    <SocialButton
                        provider="google"
                    />
                </article>

                <p className="text-center text-sm text-gray-500">
                    Eres nuevo en BloodyYue?{' '}
                    <Link
                        href="/users/register"
                        variant="link"
                        size="small"
                    >
                        Registrate
                    </Link>
                </p>

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