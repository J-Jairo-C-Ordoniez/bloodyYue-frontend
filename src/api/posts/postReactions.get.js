import fetchClient from "../fetchClient";

export default async function postReactions({ id }) {
    const data = await fetchClient(`/posts/${id}/reactions`, {
        auth: false,
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