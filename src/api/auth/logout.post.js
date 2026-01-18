import fetchClient from "../fetchClient";

export default async function logoutPost() {
    const data = await fetchClient(`/auth/logout`, {
        auth: true,
        options: {
            method: 'POST'
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