import fetchClient from "../fetchClient";

export default async function chatByIdGet({ id }) {
    const response = await fetchClient(`/chat/${id}`, {
        auth: true
    });

    if (response.error) {
        return {
            error: true,
            message: response.body,
            typeError: response.status,
        }
    }

    return {
        error: false,
        data: response.body,
    };
}
