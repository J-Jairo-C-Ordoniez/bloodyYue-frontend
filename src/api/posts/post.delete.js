import fetchClient from "../fetchClient";

export default async function postDelete({ id }) {
    const data = await fetchClient(`/posts/${id}`, {
        auth: true,
        options: {
            method: "DELETE",
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