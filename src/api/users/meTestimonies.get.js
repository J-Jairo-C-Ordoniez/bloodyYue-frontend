import fetchClient from "../fetchClient";

export default async function meTestimoniesGet() {
    const data = await fetchClient('/users/me/testimonies', {
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