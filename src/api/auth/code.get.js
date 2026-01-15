import fetchClient from "../fetchClient";

export default async function codeGet({ email }) {
    const data = await fetchClient('/auth/code', {
        auth: false,
        options: {
            method: 'POST',
            body: JSON.stringify({ email }),
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