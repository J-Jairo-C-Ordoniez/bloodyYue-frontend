import fetchClient from "../fetchClient";

export default async function labelsDelete({ id }) {
    const data = await fetchClient(`/labels/${id}`, {
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
