import fetchClient from "../fetchClient";

export default async function chatPost({ data }) {
    const response = await fetchClient(`/chat`, {
        auth: true,
        options: {
            method: "POST",
            body: JSON.stringify(data)
        }
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