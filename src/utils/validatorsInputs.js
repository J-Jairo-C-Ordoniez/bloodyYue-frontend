const validatorsInputs = {
    email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = emailRegex.test(email);
        return !result ? 'El correo electrónico debe ser válido' : '';
    },

    password(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let result = passwordRegex.test(password);
        return !result ? 'La contraseña debe contener al menos 8 caracteres' : '';
    },

    string(str) {
        const stringRegex = /^[a-zA-ZÀ-ÿ\s.,;:!?()""'']{5,}$/;
        let result = stringRegex.test(str.trim().toLowerCase());
        return !result ? 'La cadena de texto debe contener al menos 5 caracteres' : '';
    }
}

export default function validatorInput(name, value) {
    const field = validatorsInputs[name];
    return field(value);
}