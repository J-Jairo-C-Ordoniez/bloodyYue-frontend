import fetchClient from "../fetchClient";

export default async function meTestimoniesPost({ message }) {
    const data = await fetchClient('/users/me/testimonies', {
        auth: true,
        options: {
            method: 'POST',
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