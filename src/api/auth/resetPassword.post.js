import fetchClient from "../fetchClient";

export default async function resetPasswordPost({password, email }) {
    const data = await fetchClient('/auth/resetPassword', {
        auth: false,
        options: {
            method: 'POST',
            body: JSON.stringify({ password, email }),
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