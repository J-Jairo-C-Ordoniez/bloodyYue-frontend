const validatorsInputs = {
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    },

    isString(str) {
        const stringRegex = /^[a-zA-ZÀ-ÿ\s.,;:!?()""'']{5,}$/;
        return stringRegex.test(str.trim().toLowerCase());
    }
}

export default validatorsInputs;