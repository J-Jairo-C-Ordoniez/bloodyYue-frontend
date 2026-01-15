import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Checkbox from "../atoms/Checkbox";
import Link from "../atoms/Link";
import Typography from "../atoms/Typography";

export default function Form({ handleSubmit, formData, handleChange, variant = 'login', buttonText = 'Iniciar sesión' }) {

    const variants = {
        login: [
            {
                id: 'email',
                name: 'email',
                label: 'Correo',
                type: 'email',
                placeholder: 'ejemplo@gmail.com',
                value: formData.email,
                onChange: handleChange,
                colSpan: 'col-span-2'
            },
            {
                id: 'password',
                name: 'password',
                label: 'Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.password,
                onChange: handleChange,
                colSpan: 'col-span-2'
            }
        ],
        register: [
            {
                id: 'userName',
                name: 'userName',
                label: 'Nombre',
                type: 'text',
                placeholder: 'Juan Manuel Bonilla',
                value: formData.name,
                onChange: handleChange,
                colSpan: 'col-span-2'
            },
            {
                id: 'email',
                name: 'email',
                label: 'Correo',
                type: 'email',
                placeholder: 'ejemplo@gmail.com',
                value: formData.email,
                onChange: handleChange,
                colSpan: 'col-span-2'
            },
            {
                id: 'password',
                name: 'password',
                label: 'Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.password,
                onChange: handleChange,
            },
            {
                id: 'confirmPassword',
                name: 'confirmPassword',
                label: 'Confirmar Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.confirmPassword,
                onChange: handleChange,
            },
            {
                id: 'terms',
                name: 'terms',
                type: 'checkbox',
                label: (
                    <Typography variant="small">
                        Acepto los
                        <Link href="/terms" variant="link" size="default" className="text-purple-400 hover:text-purple-300">
                            Terminos y Condiciones
                        </Link> y
                        <Link href="/privacy" variant="link" size="default" className="text-purple-400 hover:text-purple-300">
                            Politica de Privacidad
                        </Link>.
                    </Typography>
                ),
                checked: formData.terms,
                onChange: handleChange,
                colSpan: 'col-span-2'
            }
        ],
        recovery: [
            {
                id: 'email',
                name: 'email',
                label: 'Correo',
                type: 'email',
                placeholder: 'ejemplo@gmail.com',
                value: formData.email,
                onChange: handleChange,
                colSpan: 'col-span-2'
            }
        ],
        resetPassword: [
            {
                id: 'newPassword',
                name: 'password',
                label: 'Nueva Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.password,
                onChange: handleChange,
                colSpan: 'col-span-2'
            },
            {
                id: 'confirmNewPassword',
                name: 'confirmPassword',
                label: 'Confirmar Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.confirmPassword,
                onChange: handleChange,
                colSpan: 'col-span-2'
            }
        ]
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
                {variant && variants[variant].map((input) => {
                    const Component = input.type === 'checkbox' ? Checkbox : Input;
                    return (
                        <div key={input.id} className={input.colSpan}>
                            <Component
                                id={input.id}
                                name={input.name}
                                label={input.label}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={input.value}
                                checked={input.checked}
                                onChange={input.onChange}
                            />
                        </div>
                    );
                })}
            </div>

            <Button
                type="submit"
                variant="submit"
                size="large"
            >
                {buttonText}
            </Button>
        </form>
    );
}