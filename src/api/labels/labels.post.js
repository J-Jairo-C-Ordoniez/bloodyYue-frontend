import fetchClient from "../fetchClient";

export default async function labelsPost({ name, color }) {
    const data = await fetchClient(`/labels`, {
        auth: true,
        options: {
            method: 'POST',
            body: JSON.stringify({
                name,
                color
            }),
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