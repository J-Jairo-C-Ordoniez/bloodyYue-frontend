import Form from "../molecules/Form";
import Link from "../atoms/Link";
import Typography from "../atoms/Typography";

export default function FormRegisterPanel({ formData, handleChange, handleSubmit, errors }) {
    return (
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
            <div className="container w-full h-full max-w-md space-y-8">
                <article className="space-y-2">
                    <Typography variant="h2" className="text-white">
                        Unete a BloodyYue
                    </Typography>
                    <Typography variant="subtitle" className="text-zinc-400">
                        Crea una cuenta para explorar arte digital exclusivo y comisiones.
                    </Typography>
                </article>

                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    variant="register"
                    buttonText="Registrate"
                />

                <Typography variant="small" className="text-center text-sm text-gray-500">
                    Ya tienes una cuenta?{' '}
                    <Link
                        href="/users/login"
                        variant="link"
                        size="default"
                        className="text-white font-medium hover:underline"
                    >
                        Accede
                    </Link>
                </Typography>

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
