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

    userName(str) {
        const stringRegex = /^[a-zA-ZÀ-ÿ\s.,;:!?()""'']{5,}$/;
        let result = stringRegex.test(str.trim().toLowerCase());
        return !result ? 'La cadena de texto debe contener al menos 5 caracteres' : '';
    },

    terms(terms) {
        return !terms ? 'Debes aceptar los términos y políticas de privacidad' : '';
    },

    otp(otp) {
        const otpRegex = /^[0-9]{6}$/;
        let result = otpRegex.test(otp);
        return !result ? 'El código debe contener 6 dígitos' : '';
    },

    number(number) {
        const numberRegex = /^[0-9]{1,5}$/;
        let result = numberRegex.test(number);
        return !result ? 'El número debe contener entre 1 y 5 dígitos' : '';
    },

    price(price) {
        const priceRegex = /^\d{1,8}(\.\d{1,2})?$/;
        let result = priceRegex.test(price);
        return !result ? 'El precio debe ser un número válido' : '';
    },

    text(text) {
        const textRegex = /^[a-zA-ZÀ-ÿ\s.,;:!?()""'']{1,50}$/;
        let result = textRegex.test(text.trim().toLowerCase());
        return !result ? 'El texto debe contener entre 1 y 50 caracteres' : '';
    },

    link(value) {
        const linkRegex = /^https?:\/\//;
        let result = linkRegex.test(value);
        return !result ? 'El enlace debe ser válido' : '';
    }
}

export default function validatorInput(name, value) {
    const field = validatorsInputs[name];
    return field(value);
}