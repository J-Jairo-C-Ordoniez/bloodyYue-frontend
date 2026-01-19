import fetchClient from "../fetchClient";

export default async function postReactionsDelete({ postId }) {
    const data = await fetchClient(`/posts/${postId}/reactions`, {
        auth: true,
        options: {
            method: "DELETE",
        },
    });

    console.log(data)

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