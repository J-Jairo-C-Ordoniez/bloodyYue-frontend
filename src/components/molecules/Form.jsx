import Input from "../atoms/Input";
import Button from "../atoms/Button";

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
                onChange: handleChange
            },
            {
                id: 'password',
                name: 'password',
                label: 'Contraseña',
                type: 'password',
                placeholder: '@Ejemplo123',
                value: formData.password,
                onChange: handleChange,
            }
        ],
        register: [
            {
                id: 'emailOrUsername',
                name: 'emailOrUsername',
                label: 'Email or Username',
                placeholder: 'Enter your email or username',
                value: formData.emailOrUsername,
                onChange: handleChange
            },
            {
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: 'Enter your password',
                value: formData.password,
                onChange: handleChange,
                className: 'mt-0'
            }
        ]
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
            <div className="space-y-5">
                {variant && (variants[variant].map((input) => (
                    <Input
                        key={input.id}
                        id={input.id}
                        name={input.name}
                        label={input.label}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={input.onChange}
                    />
                )))}
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