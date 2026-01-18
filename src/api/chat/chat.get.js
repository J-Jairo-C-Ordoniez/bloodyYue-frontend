import fetchClient from "../fetchClient";

export default async function chatGet() {
    const response = await fetchClient(`/chat`, {
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
