import fetchClient from "../fetchClient";

export default async function meProfileGet() {
    const data = await fetchClient('/users/me', {
        auth: true
    });

    if (data.error) {
        return {
            error: true,
            message: data.body,
            typeError: data.status,
        }
    }

    return {
        error: false,
        data: data.body,
    };
}