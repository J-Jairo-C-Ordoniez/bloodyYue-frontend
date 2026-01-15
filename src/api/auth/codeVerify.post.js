import fetchClient from "../fetchClient";

export default async function codeVerifyPost({ code, email }) {
    const data = await fetchClient('/auth/verify', {
        auth: false,
        options: {
            method: 'POST',
            body: JSON.stringify({ code, email }),
        },
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