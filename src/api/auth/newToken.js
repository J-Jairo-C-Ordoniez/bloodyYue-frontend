import fetchClient from "../fetchClient";

export default async function newToken() {
    const data = await fetchClient('/auth/refreshToken', {
        auth: false,
        options: {
            method: 'POST',
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