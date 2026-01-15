import fetchClient from "../fetchClient";

export default async function registerPost({ userName, email, password }) {
    const data = await fetchClient(`/auth/register`, {
        auth: false,
        options: {
            method: 'POST',
            body: JSON.stringify({
                name: userName,
                email,
                password
            })
        }
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