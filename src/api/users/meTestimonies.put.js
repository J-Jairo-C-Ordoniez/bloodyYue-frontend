import fetchClient from "../fetchClient";

export default async function meTestimoniesPut({ message }) {
    const data = await fetchClient(`/users/me/testimonies`, {
        auth: true,
        options: {
            method: 'PUT',
            body: JSON.stringify({ message }),
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