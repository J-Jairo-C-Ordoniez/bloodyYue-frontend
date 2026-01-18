import fetchClient from "../fetchClient";

export default async function postGetIdGet({ id }) {
    const data = await fetchClient(`/posts/${id}`, {
        auth: true,
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