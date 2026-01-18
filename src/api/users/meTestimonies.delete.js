import fetchClient from "../fetchClient";

export default async function meTestimoniesDelete() {
    const data = await fetchClient('/users/me/testimonies', {
        auth: true,
        options: {
            method: 'DELETE',
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